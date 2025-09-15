"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
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
    email: yup
      .string()
      .email("Invalid email")
      .required("Sender email is required"),
    address: yup.string().required("Sender address is required"),
  }),
  receiver: yup.object().shape({
    name: yup.string().required("Receiver name is required"),
    phone: yup.string().required("Receiver phone is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Receiver email is required"),
    address: yup.string().required("Receiver address is required"),
  }),
  items: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Item name is required"),
        weight: yup
          .number()
          .positive("Weight must be positive")
          .required("Weight is required"),
        notes: yup.string(),
        deliveryMethod: yup.string().required("Delivery method is required"),
      })
    )
    .min(1, "At least one item is required"),
});

const ShippingClient = ({ trackOptions, prams }) => {
  const { t,i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState("success");
  
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("Auth_Token");
    // if (!token) {
    //   router.push(`/${i18n.language}/login`);       
    // }
  }, []);
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

  // 📦 Submit
  const onSubmit = async (data) => {
    const formatDateTime = (date) => {
      const pad = (n) => (n < 10 ? "0" + n : n);
      return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        " " +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        ":" +
        pad(date.getSeconds())
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

    // console.log("📦 Final Payload:", JSON.stringify(payload, null, 2));

    try {
      const res = await ApiClient.post("merchant/orders", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_STATIC_TOKEN_HERE", // 👈 حطي التوكين الثابت
        },
      });

      console.log("✅ Order Submitted:", res.data);
      setModalType("success");
      setModalMsg(t("Your order has been submitted successfully ✅"));
      setShowModal(true);
      reset();
    } catch (err) {
      console.error(
        "❌ Failed to submit order",
        err.response?.data || err.message
      );
      setModalType("error");
      setModalMsg(t("Something went wrong while submitting your order ❌"));
      setShowModal(true);
    }
  };

  return (
    <div className="ship my-5" dir={isArabic ? "rtl" : "ltr"}>
      <div className="div22">
        <h1 style={{ textAlign: "center", padding: "2%", color: "white" }}>
          {t("Shipping Booking")}
        </h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Track Select */}
          <Form.Group>
            <Form.Label>{t("Track Name")}</Form.Label>
            <Form.Select
              {...register("trackName")}
              onChange={(e) => {
                const track = trackOptions.find(
                  (opt) => opt.value == e.target.value
                );
                setSelectedTrack(track);
              }}
            >
              <option value="">{t("Select Track")}</option>
              {trackOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
            <p className="text-danger">{errors.trackName?.message}</p>
          </Form.Group>

          {/* Sender Info */}
          <h4 className="mt-4">{t("Sender Info")}</h4>
          {["name", "phone", "email", "address"].map((field) => (
            <Form.Group key={field}>
              <Form.Label>{t(`Sender ${field}`)}</Form.Label>
              <Form.Control {...register(`sender.${field}`)} />
              <p className="text-danger">{errors.sender?.[field]?.message}</p>
            </Form.Group>
          ))}

          {/* Receiver Info */}
          <h4 className="mt-4">{t("Receiver Info")}</h4>
          {["name", "phone", "email", "address"].map((field) => (
            <Form.Group key={field}>
              <Form.Label>{t(`Receiver ${field}`)}</Form.Label>
              <Form.Control {...register(`receiver.${field}`)} />
              <p className="text-danger">{errors.receiver?.[field]?.message}</p>
            </Form.Group>
          ))}

          {/* Items */}
          <h4 className="mt-4">{t("Items")}</h4>
          {fields.map((item, index) => (
            <div key={item.id} className="border p-3 mb-3 rounded">
              <Form.Group>
                <Form.Label>{t("Item Name")}</Form.Label>
                <Form.Control {...register(`items.${index}.name`)} />
                <p className="text-danger">
                  {errors.items?.[index]?.name?.message}
                </p>
              </Form.Group>

              <Form.Group>
                <Form.Label>{t("Weight (kg)")}</Form.Label>
                <Form.Control
                  type="number"
                  {...register(`items.${index}.weight`)}
                />
                <p className="text-danger">
                  {errors.items?.[index]?.weight?.message}
                </p>
              </Form.Group>

              <Form.Group>
                <Form.Label>{t("Notes")}</Form.Label>
                <Form.Control {...register(`items.${index}.notes`)} />
              </Form.Group>

              <Form.Group>
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
                <Button
                  variant="danger"
                  onClick={() => remove(index)}
                  className={isArabic ? "mt-2 me-auto" : "mt-2 ms-auto"}
                >
                  {t("Remove Item")}
                </Button>
              )}
            </div>
          ))}

          <Button
            variant="secondary"
            className="my-2"
            onClick={() =>
              append({ name: "", weight: "", notes: "", deliveryMethod: "" })
            }
          >
            {t("Add Another Item")}
          </Button>

          <Button
            className="my-3 btn d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              backgroundColor: "rgb(200, 35, 56)",
              border: "none",
            }}
            type="submit"
          >
            <span>{t("Submit Booking")}</span>
          </Button>
        </Form>
      </div>

      {/* ✅ Success/Error Popup */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "success" ? t("Success") : t("Error")}
          </Modal.Title>
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
