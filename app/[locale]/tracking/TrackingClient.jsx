"use client";
import { useTranslation } from "react-i18next";
import "./tracking.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ApiClient from "@/Services/APIs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const TrackingClient = ({ locale }) => {
  const [trackingId, setTrackingId] = useState("");
  const [orderLocation, setOrderLocation] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trackingId.trim().startsWith("CANN-")) {
      setError(t("tracking.invalidPrefix"));
      setOrderLocation(null);
      setShowModal(false);
      return;
    }

    try {
      const res = await ApiClient.get(`orders/by-serial/${trackingId}`);
      const foundOrder = res;

      // console.log("order", foundOrder);

      if (!foundOrder || !foundOrder.status) {
        setError(t("tracking.notFound"));
        setOrderLocation(null);
        setShowModal(false);
        return;
      }

      setOrderLocation(foundOrder);
      setError("");
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setError(t("tracking.notFound"));
      setOrderLocation(null);
      setShowModal(false);
    }
  };
  const statusMap = {
    pending: "Pending",
    processing: "Processing",
    ready_for_pickup: "Ready for Pickup",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    failed: "Failed",
    returned: "Returned",
  };

  const getBorderColor = () => {
    if (!trackingId) return "1px solid red";
    if (!trackingId.startsWith("CANN-")) return "1px solid red";
    return "1px solid green";
  };

  return (
    <>
      <div className="serv">
        <div className="container">
          <h1>{t("tracking.title")}</h1>
          <p>
            {t("tracking.home")} / {t("tracking.title")}
          </p>
        </div>
      </div>

      <div className="track py-5 px-3">
        <div className="tracking-container flex-column align-items-center">
          <h3 className="mb-4">{t("tracking.trackYourOrder")}</h3>
          <Form
            className="tracking-form px-3 py-3 rounded"
            onSubmit={handleSubmit}
          >
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <Form.Group className="w-100 mx-md-2 my-2">
                <Form.Control
                  type="text"
                  placeholder={t("tracking.placeholder")}
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  style={{ border: getBorderColor() }}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 mx-md-2 my-2"
                style={{
                  backgroundColor: "#E02D25",
                  border: "1px solid #E02D25",
                }}
              >
                <span>{t("tracking.trackOrderBtn")}</span>
              </Button>
            </div>
          </Form>

          {error && <p className="text-light text-center my-3">{error}</p>}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>{t("tracking.orderStatusTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderLocation && (
            <div className="order-status-timeline">
              {(() => {
                const allStatuses = [
                  "pending",
                  "processing",
                  "ready_for_pickup",
                  "out_for_delivery",
                  "delivered",
                  "failed",
                  "returned",
                ];

                let statusesToShow = allStatuses;
                if (
                  ["delivered", "failed", "returned"].includes(
                    orderLocation.status
                  )
                ) {
                  const endIndex = allStatuses.indexOf(orderLocation.status);
                  statusesToShow = allStatuses.slice(0, endIndex + 1);
                }

                return statusesToShow.map((status, index, arr) => {
                  const isActive = status === orderLocation.status;
                  const isCompleted = arr.indexOf(orderLocation.status) > index;

                  const finalColors = {
                    delivered: "#28a745", // أخضر
                    failed: "#dc3545", // أحمر
                    returned: "#ffc107", // أصفر
                  };

                  return (
                    <div className="status-step" key={status}>
                      <div
                        className={`circle ${
                          isActive ? "active" : isCompleted ? "completed" : ""
                        }`}
                        style={{
                          backgroundColor:
                            isActive && finalColors[status]
                              ? finalColors[status]
                              : isActive
                              ? "#e02d25"
                              : isCompleted
                              ? "#28a745"
                              : "#ccc",
                        }}
                      >
                        {index + 1}
                      </div>
                      <span className="status-label">{statusMap[status]}</span>
                      {index !== arr.length - 1 && <div className="line"></div>}
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("tracking.closeBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TrackingClient;
