import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/payment.css";
import { makePayment, cancelPayment } from "../../api/resortApi";

const METHODS = [
  { key: "UPI", icon: "bi-upc-scan", label: "UPI" },
  { key: "CARD", icon: "bi-credit-card", label: "Card" },
  { key: "NETBANKING", icon: "bi-bank", label: "Net Banking" },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const token = localStorage.getItem("token");

  const [method, setMethod] = useState("UPI");
  const [transactionId, setTransactionId] = useState("");

  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [payment, setPayment] = useState(null);

  const canPay = useMemo(() => {
    return Boolean(bookingId && method && transactionId.trim().length >= 6);
  }, [bookingId, method, transactionId]);

  const onPay = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!token) {
      setError("Please login first to make payment.");
      return;
    }

    if (!bookingId) {
      setError("Booking ID not found in URL.");
      return;
    }

    if (!canPay) {
      setError("Please select method and enter valid transaction ID (min 6 chars).");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        bookingId,
        method,
        transactionId: transactionId.trim(),
      };

      const res = await makePayment(payload);
      setPayment(res.data);
      setSuccessMsg("Payment successful ✅");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Payment failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onCancelPayment = async () => {
    if (!payment?.paymentId) return;

    setCanceling(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await cancelPayment(payment.paymentId);
      setSuccessMsg(typeof res.data === "string" ? res.data : "Payment cancelled successfully ✅");
      setPayment((p) => (p ? { ...p, status: "CANCELLED" } : p));
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Cancel payment failed";
      setError(msg);
    } finally {
      setCanceling(false);
    }
  };

  return (
    <main className="pay-page">
      <div className="container py-5" style={{ maxWidth: 980 }}>
        <div className="row g-4">
          {/* LEFT: Form */}
          <div className="col-12 col-lg-7">
            <div className="card pay-card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <div className="pay-brand">
                      <span className="pay-dot">
                        <i className="bi bi-gem" />
                      </span>
                      <span>Elite Resort</span>
                    </div>
                    <h2 className="pay-title mb-1">Payment</h2>
                    <p className="text-muted mb-0">
                      Complete your payment for booking <b>{bookingId}</b>
                    </p>
                  </div>

                  {!token ? (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate("/login", { state: { from: `/payment/${bookingId}` } })}
                    >
                      Login
                    </button>
                  ) : (
                    <span className="badge bg-success-subtle text-success px-3 py-2">
                      Logged In
                    </span>
                  )}
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mt-3">
                    <i className="bi bi-exclamation-triangle me-2" />
                    {error}
                  </div>
                )}

                {successMsg && (
                  <div className="alert alert-success py-2 mt-3">
                    <i className="bi bi-check-circle me-2" />
                    {successMsg}
                  </div>
                )}

                <form onSubmit={onPay} className="mt-4">
                  {/* METHOD */}
                  <label className="form-label">Payment Method</label>
                  <div className="row g-2 mb-3">
                    {METHODS.map((m) => (
                      <div key={m.key} className="col-12 col-md-4">
                        <button
                          type="button"
                          className={`pay-method ${method === m.key ? "active" : ""}`}
                          onClick={() => setMethod(m.key)}
                        >
                          <i className={`bi ${m.icon} me-2`} />
                          {m.label}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* TXN */}
                  <div className="mb-3">
                    <label className="form-label">Transaction ID</label>
                    <input
                      className="form-control"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="TXN123456789"
                      minLength={6}
                      required
                    />
                    <div className="form-text">
                      Enter the reference ID from your UPI/Card/Netbanking payment.
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="d-flex flex-column flex-md-row gap-2 justify-content-end mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/rooms")}
                    >
                      Back to Rooms
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                      disabled={!token || loading || !canPay}
                      title={!token ? "Login first" : "Pay now"}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay Now <i className="bi bi-arrow-right ms-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm border-0 pay-summary">
              <div className="card-body p-4 p-md-5">
                <h5 className="mb-3">Payment Summary</h5>

                <div className="pay-line">
                  <span className="text-muted">Booking ID</span>
                  <b className="text-break">{bookingId}</b>
                </div>

                <div className="pay-line">
                  <span className="text-muted">Method</span>
                  <b>{method}</b>
                </div>

                <div className="pay-line">
                  <span className="text-muted">Transaction ID</span>
                  <b className="text-break">{transactionId || "-"}</b>
                </div>

                <hr />

                {!payment ? (
                  <div className="text-muted">
                    After successful payment, details will appear here.
                  </div>
                ) : (
                  <>
                    <div className="pay-line">
                      <span className="text-muted">Payment ID</span>
                      <b className="text-break">{payment.paymentId}</b>
                    </div>

                    <div className="pay-line">
                      <span className="text-muted">Amount</span>
                      <b>${payment.amount}</b>
                    </div>

                    <div className="pay-line">
                      <span className="text-muted">Status</span>
                      <span
                        className={`badge ${
                          payment.status === "SUCCESS"
                            ? "bg-success"
                            : payment.status === "FAILED"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>

                    <div className="pay-line">
                      <span className="text-muted">Paid At</span>
                      <b className="text-break">{payment.paidAt || "-"}</b>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                      <button
                        className="btn btn-outline-danger"
                        onClick={onCancelPayment}
                        disabled={canceling || payment.status === "CANCELLED"}
                      >
                        {canceling ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Cancelling...
                          </>
                        ) : (
                          "Cancel Payment"
                        )}
                      </button>
                    </div>
                  </>
                )}

                <div className="pay-tip mt-4">
                  <i className="bi bi-shield-check me-2" />
                  Payments are secured and linked to your booking.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer action */}
        <div className="text-center text-muted small mt-4">
          Tip: Use correct Transaction ID to avoid failed payments.
        </div>
      </div>
    </main>
  );
}