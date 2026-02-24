import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Validation
  const canSubmit = useMemo(() => {
    return form.email.trim() !== "" && form.password.trim().length >= 6;
  }, [form]);

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Please enter valid email and password (minimum 6 characters).");
      return;
    }

    setLoading(true);

    try {
      // 🔥 Replace this with real API call (Flask/Django)
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save token
      localStorage.setItem("token", "demo_token");

      // Redirect to user profile page
      navigate("/profile", { replace: true });

    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page auth-page-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="auth-card animate-auth">

              {/* Header */}
              <div className="text-center mb-4">
                <div className="auth-badge-sm mx-auto">
                  <i className="bi bi-gem" />
                </div>

                <div className="auth-kicker mt-3">Elite Resort</div>
                <h2 className="auth-title">Welcome Back</h2>

                <p className="auth-subtitle">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="auth-link">
                    Create one
                  </Link>
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-danger py-2 mb-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={onSubmit}>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="auth-input">
                    <i className="bi bi-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="auth-input">
                    <i className="bi bi-lock"></i>
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={onChange}
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShow((prev) => !prev)}
                    >
                      <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>

                  <Link to="/forgot" className="auth-link small">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 auth-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Login <i className="bi bi-arrow-right ms-1"></i>
                    </>
                  )}
                </button>

                {/* Footer */}
                <div className="auth-foot mt-4 text-center">
                  By signing in, you agree to our{" "}
                  <span className="auth-muted-link">Terms</span> and{" "}
                  <span className="auth-muted-link">Privacy Policy</span>.
                </div>
              </form>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-3">
              <Link to="/" className="auth-link small">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}