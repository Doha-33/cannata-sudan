"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import ApiClient from "@/Services/APIs";
import "./otpModal.css";

export default function OTPModal({ show, onHide, email, phone, onVerified }) {
  const [method, setMethod] = useState("email");
  const [value, setValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // عند فتح المودال، نحدث القيمة حسب الـ method الافتراضي
  useEffect(() => {
    if (show) {
      if (method === "email") setValue(email || "");
      else setValue(phone || "");
      setIsEditable(false); // Lock افتراضي
      setOtpSent(false);
      setOtp("");
      setError("");
    }
  }, [show, email, phone, method]);

  const handleSendOtp = async () => {
    if (!value) {
      setError(`Please enter your ${method}`);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await ApiClient.post("merchant/sendOtp", { type: method, value });
      if (res.data?.success === false) {
        setError(res.data?.error?.value?.[0] || res.data?.message || "Failed to send OTP.");
        return;
      }
      setOtpSent(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send OTP, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter OTP code");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await ApiClient.post("merchant/checkOtp", { type: method, value, otp });
      if (res?.status === true) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onVerified();
          onHide();
        }, 2000);
      } else {
        setError("Invalid OTP, please try again.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop="static"
        className="otp-modal"
        contentClassName="p-3 rounded shadow-lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#2d2c6f" }}>
          <Modal.Title className="text-white">🔒 OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!otpSent ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Choose Verification Method</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    id="email-option"
                    label="Email"
                    name="method"
                    value="email"
                    checked={method === "email"}
                    onChange={() => {
                      setMethod("email");
                      setValue(email || "");
                      setIsEditable(true);
                    }}
                  />
                  <Form.Check
                    type="radio"
                    id="phone-option"
                    label="Phone"
                    name="method"
                    value="phone"
                    checked={method === "phone"}
                    onChange={() => {
                      setMethod("phone");
                      setValue(phone || "");
                      setIsEditable(true);
                    }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">{method === "email" ? "Email" : "Phone"}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={value}
                    disabled={!isEditable}
                    placeholder={`Enter your ${method}`}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Button
                    variant={isEditable ? "secondary" : "outline-primary"}
                    onClick={() => setIsEditable(!isEditable)}
                  >
                    {isEditable ? "Lock" : "Edit"}
                  </Button>
                </InputGroup>
              </Form.Group>

              {error && <p className="text-danger small">{error}</p>}

              <Button
                className="w-100"
                style={{ backgroundColor: "#2d2c6f", border: "none" }}
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  value={otp}
                  placeholder="Enter the OTP code"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>

              {error && <p className="text-danger small">{error}</p>}

              <Button
                className="w-100"
                variant="success"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered backdrop="static">
        <Modal.Body className="text-center p-4">
          <h4 className="text-success">✅ OTP Verified Successfully</h4>
          <p>You will be redirected to login...</p>
        </Modal.Body>
      </Modal>
    </>
  );
}