import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/booking.css";
import { createBooking, cancelBooking } from "../../api/resortApi";

function toYMD(value) {
  // <input type="date" /> already gives "YYYY-MM-DD"
  return (value || "").trim();
}

function daysBetween(a, b) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  const ms = d2.getTime() - d1.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export default function BookingPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [form, setForm] = useState({
    checkInDate: "",
    checkOutDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);

  // ✅ use your login token key (change if your project uses different key)
  const token = localStorage.getItem("token");

  const nights = useMemo(() => {
    if (!form.checkInDate || !form.checkOutDate) return 0;
    const n = daysBetween(form.checkInDate, form.checkOutDate);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [form.checkInDate, form.checkOutDate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const validate = () => {
    if (!token) return "Please login first.";
    if (!roomId) return "Room ID not found in URL.";
    if (!form.checkInDate) return "Please select check-in date.";
    if (!form.checkOutDate) return "Please select check-out date.";

    const inD = new Date(form.checkInDate);
    const outD = new Date(form.checkOutDate);

    if (Number.isNaN(inD.getTime()) || Number.isNaN(outD.getTime())) {
      return "Invalid date selected.";
    }
    if (outD <= inD) {
      return "Check-out date must be after check-in date.";
    }
    return "";
  };

  // ✅ BOOK & REDIRECT TO PAYMENT
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) return setError(msg);

    setLoading(true);

    try {
      // ✅ EXACT BODY THAT YOU WANT
      const payload = {
        checkInDate: toYMD(form.checkInDate),
        checkOutDate: toYMD(form.checkOutDate),
      };

      // ✅ createBooking should send token in headers (see resortApi code below)
      const res = await createBooking(roomId, payload);
      const data = res?.data ?? res;

      console.log("BOOKING API RESPONSE:", data);

      const bookingId =
        data?.bookingId ||
        data?._id ||
        data?.id ||
        data?.data?.bookingId ||
        data?.data?._id ||
        data?.data?.id;

      if (!bookingId) {
        setError("Booking created but bookingId not received from server.");
        return;
      }

      setBooking(data);

      // ✅ Redirect to payment page
      navigate(`/payment/${bookingId}`, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Booking failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel booking (optional)
  const onCancel = async () => {
    const bookingId =
      booking?.bookingId ||
      booking?._id ||
      booking?.id ||
      booking?.data?.bookingId ||
      booking?.data?._id ||
      booking?.data?.id;

    if (!bookingId) return;

    setCanceling(true);
    setError("");

    try {
      await cancelBooking(bookingId);
      setBooking((p) => (p ? { ...p, status: "CANCELLED" } : p));
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Cancel failed";
      setError(msg);
    } finally {
      setCanceling(false);
    }
  };

  const goLogin = () =>
    navigate("/login", { state: { from: `/booking/${roomId}` } });

  return (
    <main className="booking-page">
      <div className="container py-5" style={{ maxWidth: 820 }}>
        <div className="card shadow-sm border-0 booking-card">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
              <div>
                <h2 className="mb-1">Book Room</h2>
                <div className="text-muted">
                  Room ID: <b>{roomId}</b>
                </div>
              </div>

              {!token ? (
                <button className="btn btn-outline-primary" onClick={goLogin}>
                  Login to Book
                </button>
              ) : (
                <span className="badge bg-success-subtle text-success px-3 py-2">
                  Logged In
                </span>
              )}
            </div>

            {error && (
              <div className="alert alert-danger py-2">
                <i className="bi bi-exclamation-triangle me-2" />
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-3">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Check-in Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkInDate"
                    value={form.checkInDate}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Check-out Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkOutDate"
                    value={form.checkOutDate}
                    onChange={onChange}
                    required
                    min={form.checkInDate || undefined}
                  />
                </div>

                <div className="col-12">
                  <div className="p-3 rounded border bg-light">
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Nights</div>
                      <div>
                        <b>{nights}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                  disabled={loading || !token}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Booking...
                    </>
                  ) : (
                    <>
                      Confirm Booking <i className="bi bi-arrow-right ms-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {(booking?.bookingId || booking?._id || booking?.id) && (
              <div className="mt-4 d-flex justify-content-end">
                <button
                  className="btn btn-outline-danger"
                  onClick={onCancel}
                  disabled={canceling || booking?.status === "CANCELLED"}
                >
                  {canceling ? "Cancelling..." : "Cancel Booking"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}