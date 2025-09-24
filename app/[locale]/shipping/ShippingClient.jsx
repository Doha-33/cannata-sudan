"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./shipping.css";
import ApiClient from "@/Services/APIs";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  trackName: yup.string().required("Track name is required"),
  sender: yup.object().shape({
    name: yup.string().required("Sender name is required"),
    phone: yup.string().required("Sender phone is required"),
    email: yup.string().email("Invalid email").required("Sender email is required"),
    address: yup.string().required("Sender address is required"),
  }),
  receiver: yup.object().shape({
    name: yup.string().required("Receiver name is required"),
    phone: yup.string().required("Receiver phone is required"),
    email: yup.string().email("Invalid email").required("Receiver email is required"),
    address: yup.string().required("Receiver address is required"),
  }),
  items: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Item name is required"),
      weight: yup.number().positive("Weight must be positive").required("Weight is required"),
      notes: yup.string(),
      deliveryMethod: yup.string().required("Delivery method is required"),
    })
  ).min(1, "At least one item is required"),
});

const ShippingClient = ({ trackOptions, prams }) => {
  const { t,i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("success");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      trackName: "",
      sender: { name: "", phone: "", email: "", address: "" },
      receiver: { name: "", phone: "", email: "", address: "" },
      items: [{ name: "", weight: "", notes: "", deliveryMethod: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = async (data) => {
    const formatDateTime = (date) => {
      const pad = (n) => (n < 10 ? "0" + n : n);
      return (
        date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " +
        pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds())
      );
    };

    const payload = {
      track_id: data.trackName,
      name_sender: data.sender.name,
      phone_sender: data.sender.phone,
      address_sender: data.sender.address,
      email_sender: data.sender.email,
      name_receiver: data.receiver.name,
      phone_receiver: data.receiver.phone,
      address_receiver: data.receiver.address,
      email_receiver: data.receiver.email,
      delivered_at: formatDateTime(new Date()),
      items: data.items.map((item) => ({
        name: item.name,
        weight: Number(item.weight),
        shipping_method_id: Number(item.deliveryMethod),
      })),
    };

    try {
      const res = await ApiClient.post("merchant/orders", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_STATIC_TOKEN_HERE",
        },
      });

      setModalType("success");
      setModalMsg(t("Your order has been submitted successfully ✅"));
      setShowModal(true);
      reset();
    } catch (err) {
      setModalType("error");
      setModalMsg(t("Something went wrong while submitting your order ❌"));
      setShowModal(true);
    }
  };

  return (
    <div className="ship-modern my-5" dir={isArabic ? "rtl" : "ltr"}>
      <Card className="shadow-lg shipping-card">
        <Card.Header className="text-center py-3 text-white" style={{background:"rgb(45, 44, 111)"}}>
          <h2>{t("Shipping Booking")}</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Track Select */}
            <Form.Group className="mb-3">
              <Form.Label>{t("Track Name")}</Form.Label>
              <Form.Select
                {...register("trackName")}
                onChange={(e) => {
                  const track = trackOptions.find((opt) => opt.value == e.target.value);
                  setSelectedTrack(track);
                }}
              >
                <option value="">{t("Select Track")}</option>
                {trackOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Form.Select>
              <p className="text-danger">{errors.trackName?.message}</p>
            </Form.Group>

            {/* Sender Info */}
            <h4 className="section-title">{t("Sender Info")}</h4>
            <div className="row">
              {["name", "phone", "email", "address"].map((field) => (
                <div className="col-md-6" key={field}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t(`Sender ${field}`)}</Form.Label>
                    <Form.Control {...register(`sender.${field}`)} />
                    <p className="text-danger">{errors.sender?.[field]?.message}</p>
                  </Form.Group>
                </div>
              ))}
            </div>

            {/* Receiver Info */}
            <h4 className="section-title">{t("Receiver Info")}</h4>
            <div className="row">
              {["name", "phone", "email", "address"].map((field) => (
                <div className="col-md-6" key={field}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t(`Receiver ${field}`)}</Form.Label>
                    <Form.Control {...register(`receiver.${field}`)} />
                    <p className="text-danger">{errors.receiver?.[field]?.message}</p>
                  </Form.Group>
                </div>
              ))}
            </div>

            {/* Items */}
            <h4 className="section-title">{t("Items")}</h4>
            {fields.map((item, index) => (
              <Card className="mb-3 border-0 shadow-sm" key={item.id}>
                <Card.Body>
                  <Form.Group className="mb-2">
                    <Form.Label>{t("Item Name")}</Form.Label>
                    <Form.Control {...register(`items.${index}.name`)} />
                    <p className="text-danger">{errors.items?.[index]?.name?.message}</p>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>{t("Weight (kg)")}</Form.Label>
                    <Form.Control type="number" {...register(`items.${index}.weight`)} />
                    <p className="text-danger">{errors.items?.[index]?.weight?.message}</p>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>{t("Notes")}</Form.Label>
                    <Form.Control {...register(`items.${index}.notes`)} />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>{t("Delivery Method")}</Form.Label>
                    <Form.Select {...register(`items.${index}.deliveryMethod`)}>
                      <option value="">{t("Select Method")}</option>
                      {selectedTrack?.methods.map((m) => (
                        <option key={m.id} value={m.id}>
                          {t(m.type)} ({m.price}$)
                        </option>
                      ))}
                    </Form.Select>
                    <p className="text-danger">
                      {errors.items?.[index]?.deliveryMethod?.message}
                    </p>
                  </Form.Group>

                  {fields.length > 1 && (
                    <Button variant="outline-danger" size="sm" onClick={() => remove(index)}>
                      {t("Remove Item")}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}

            <Button
              variant="outline-secondary"
              className="my-2"
              onClick={() => append({ name: "", weight: "", notes: "", deliveryMethod: "" })}
            >
              {t("Add Another Item")}
            </Button>

            <Button
              className="my-3 w-100 submit-btn"
              style={{ backgroundColor: "rgb(200, 35, 56)", border: "none" }}
              type="submit"
            >
              {t("Submit Booking")}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Success/Error Popup */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "success" ? t("Success") : t("Error")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMsg}</Modal.Body>
        <Modal.Footer>
          <Button
            variant={modalType === "success" ? "success" : "danger"}
            onClick={() => setShowModal(false)}
          >
            {t("OK")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShippingClient;
