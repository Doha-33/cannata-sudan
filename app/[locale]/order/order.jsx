"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ApiClient from "@/Services/APIs";
import "./order.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function OrdersPage() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("Pending");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [orderLocation, setOrderLocation] = useState(null);
  const [error, setError] = useState("");

  // 🟢 جلب كل أوردرات التاجر بعد تسجيل الدخول
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("Auth_Token"); // ✅ صححنا هنا
        const res = await ApiClient.get("merchant/all-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res && res.data) {
          setData(res.data);
          console.log("Orders:", res.data); // ✅ شوف النتايج
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredData = data.filter(
    (o) => o.status.toLowerCase() === activeTab.toLowerCase()
  );

  // 🟢 البحث برقم الأوردر
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trackingId.trim().startsWith("CANN-")) {
      setError(t("tracking.invalidPrefix"));
      setOrderLocation(null);
      return;
    }

    try {
      const res = await ApiClient.get(`orders/by-serial/${trackingId}`);
      const foundOrder = res.data;
      console.log("order", foundOrder);

      if (!foundOrder || !foundOrder.status) {
        setError(t("tracking.notFound"));
        setOrderLocation(null);
        return;
      }

      setOrderLocation({
        ...foundOrder,
        status: foundOrder.status.toLowerCase(),
      });

      setError("");
    } catch (err) {
      console.error(err);
      setError(t("tracking.notFound"));
      setOrderLocation(null);
    }
  };

  const statusMap = {
    pending: "Pending",
    received: "Received",
    confirmed: "Confirmed",
    processing: "Processing",
    ready_for_pickup: "Ready for Pickup",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
  };

  const statusTabs = [
    "Pending",
    "Received",
    "Confirmed",
    "Processing",
    "Ready for Pickup",
    "Out for Delivery",
    "Delivered",
  ];

  const getBorderColor = () => {
    if (!trackingId) return "1px solid #ced4da";
    if (!trackingId.startsWith("CANN-")) return "1px solid #dc3545";
    return "1px solid #28a745";
  };

  return (
    <div className="orders-container">
      {/* 🟢 البحث برقم التتبع */}
      <section className="tracking-section">
        <p className="tracking-title">{t("Serial Number")}</p>
        <Form className="tracking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <Form.Group className="form-group">
              <Form.Control
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                style={{ border: getBorderColor() }}
                placeholder="CANN-XXXXX"
              />
            </Form.Group>
            <Button type="submit" className="track-button" disabled={loading}>
              {loading ? "Searching..." : t("tracking.trackOrderBtn")}
            </Button>
          </div>
        </Form>
        {error && <p className="error-message">{error}</p>}
      </section>

      {/* 🟢 Timeline لو الأوردر متجاب بالـ serial number */}
      {orderLocation && (
        <div className="timeline-box">
          <p>
            <strong>Serial Number :</strong> {trackingId} &nbsp;
            <strong>Status :</strong> {statusMap[orderLocation.status]}
          </p>
          <div className="order-status-timeline">
            {(() => {
              const allStatuses = Object.keys(statusMap);
              return allStatuses.map((status, index) => {
                const isActive = status === orderLocation.status;
                const isCompleted =
                  allStatuses.indexOf(orderLocation.status) > index;
                return (
                  <div className="status-step" key={status}>
                    <div
                      className={`circle ${
                        isActive ? "active" : isCompleted ? "completed" : ""
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="status-label">{statusMap[status]}</span>
                    {index !== allStatuses.length - 1 && (
                      <div className="line"></div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* 🟢 أوردرات التاجر */}
      <section className="orders-section">
        <h2 className="orders-title">MY Orders</h2>
        <div className="status-tabs">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              className={`status-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="orders-count">
          {filteredData.length} of the orders have {activeTab}.
        </p>

        {loading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <div className="orders-grid">
            {filteredData.map((order) => (
              <div className="order-card" key={order.serial_number}>
                <span className={`order-status-badge ${order.status}`}>
                  {order.status}
                </span>

                <p>
                  <strong>Serial number:</strong> {order.serial_number}
                </p>
                <p>
                  <strong>Total Amount:</strong> {order.total_amount}
                </p>

                <div className="parties">
                  <div className="party sender">
                    <h4>Sender</h4>
                    <p>Name: {order.sender.name}</p>
                    <p>Phone: {order.sender.phone}</p>
                    <p>Email: {order.sender.email}</p>
                    <p>Address: {order.sender.address}</p>
                  </div>
                  <div className="party receiver">
                    <h4>Receiver</h4>
                    <p>Name: {order.receiver.name}</p>
                    <p>Phone: {order.receiver.phone}</p>
                    <p>Email: {order.receiver.email}</p>
                  </div>
                </div>

                <div className="items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} - {item.weight}kg{" "}
                        {item.note && `(${item.note})`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredData.length === 0 && (
          <p className="no-orders">No data found for this status.</p>
        )}
      </section>
    </div>
  );
}
