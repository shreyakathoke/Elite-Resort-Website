import { useState } from "react";
import "../../styles/contactPage.css";
import { sendContact } from "../../api/resortApi";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" }); // success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    setLoading(true);

    try {
      await sendContact({
        name: form.name,
        email: form.email,
        phoneNo: form.phone,
        subject: form.subject,
        message: form.message,

        // ✅ fallback (some backends use query instead of subject/message)
        query: `${form.subject} - ${form.message}`,
      });

      setStatus({ type: "success", msg: "Message sent successfully ✅" });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.log("CONTACT ERROR:", err?.response?.data || err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to send message. Please try again.";
      setStatus({ type: "error", msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      {/* HERO */}
      <section className="contact-hero2">
        <div className="contact-hero2-bg" />
        <div className="container contact-hero2-inner text-center">
          <div className="contact-hero2-box">
            <div className="contact-hero2-line" />
            <h1 className="contact-hero2-title">Contact</h1>
            <p className="contact-hero2-sub">
              We’re here to help you plan a perfect stay. Reach out for bookings, events,
              or special requests.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="contact-body">
        <div className="container py-5">
          <div className="row g-4">
            {/* LEFT: INFO */}
            <div className="col-12 col-lg-5">
              <div className="contact-card">
                <h3 className="contact-card-title">Get in touch</h3>
                <p className="contact-card-text">
                  Whether you’re planning a romantic getaway, family holiday, or business
                  retreat — our team will respond quickly.
                </p>

                <div className="contact-info">
                  <div className="info-item">
                    <div className="info-ic">
                      <i className="bi bi-geo-alt" />
                    </div>
                    <div>
                      <div className="info-label">Address</div>
                      <div className="info-value">Elite Resort, Beach Road, India</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-ic">
                      <i className="bi bi-telephone" />
                    </div>
                    <div>
                      <div className="info-label">Phone</div>
                      <div className="info-value">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-ic">
                      <i className="bi bi-envelope" />
                    </div>
                    <div>
                      <div className="info-label">Email</div>
                      <div className="info-value">support@eliteresort.com</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-ic">
                      <i className="bi bi-clock" />
                    </div>
                    <div>
                      <div className="info-label">Hours</div>
                      <div className="info-value">Mon – Sun: 9:00 AM – 9:00 PM</div>
                    </div>
                  </div>
                </div>

                <div className="contact-social mt-4">
                  <a className="social-btn" href="#" aria-label="Instagram">
                    <i className="bi bi-instagram" />
                  </a>
                  <a className="social-btn" href="#" aria-label="Facebook">
                    <i className="bi bi-facebook" />
                  </a>
                  <a className="social-btn" href="#" aria-label="Twitter">
                    <i className="bi bi-twitter-x" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="col-12 col-lg-7">
              <div className="contact-form-card">
                <h3 className="contact-card-title">Send us a message</h3>
                <p className="contact-card-text">
                  Fill out the form and we’ll get back to you within 24 hours.
                </p>

                {/* ✅ Status message */}
                {status.msg ? (
                  <div
                    className={`alert ${
                      status.type === "success" ? "alert-success" : "alert-danger"
                    }`}
                    role="alert"
                  >
                    {status.msg}
                  </div>
                ) : null}

                <form onSubmit={onSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label contact-label">Full Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        type="text"
                        className="form-control contact-input"
                        placeholder="Your name"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label contact-label">Email</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        type="email"
                        className="form-control contact-input"
                        placeholder="your@email.com"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label contact-label">Phone</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        type="tel"
                        className="form-control contact-input"
                        placeholder="+91..."
                        disabled={loading}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label contact-label">Subject</label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={onChange}
                        type="text"
                        className="form-control contact-input"
                        placeholder="Booking / Event / Support"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label contact-label">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        className="form-control contact-input contact-textarea"
                        rows="5"
                        placeholder="Tell us what you’re looking for..."
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="col-12">
                      <button
                        className="contact-send-btn"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* MAP */}
            <div className="col-12">
              <div className="contact-map">
                <iframe
                  title="Elite Resort location"
                  src="https://www.google.com/maps?q=Goa&output=embed"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}