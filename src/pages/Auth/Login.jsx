import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return form.email.trim() && form.password.trim().length >= 6;
  }, [form]);

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Please enter a valid email and password (min 6 characters).");
      return;
    }

    setLoading(true);
    try {
      // TODO: connect backend (Flask)
      await new Promise((r) => setTimeout(r, 650));

      localStorage.setItem("token", "demo_token");
      navigate("/", { replace: true });
    } catch {
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
              <div className="text-center mb-3">
                <div className="auth-badge-sm mx-auto">
                  <i className="bi bi-gem" />
                </div>
                <div className="auth-kicker mt-3">Elite Resort</div>
                <h1 className="auth-title mb-1">Welcome back</h1>
                <div className="auth-subtitle">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="auth-link">
                    Create one
                  </Link>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle me-2" />
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="auth-input">
                    <i className="bi bi-envelope" />
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

                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <div className="auth-input">
                    <i className="bi bi-lock" />
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
                      onClick={() => setShow((p) => !p)}
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>

                  <Link to="/forgot" className="auth-link small">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 auth-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Login <i className="bi bi-arrow-right ms-1" />
                    </>
                  )}
                </button>

                <div className="auth-foot mt-4 text-center">
                  By signing in, you agree to our{" "}
                  <span className="auth-muted-link">Terms</span> and{" "}
                  <span className="auth-muted-link">Privacy Policy</span>.
                </div>
              </form>
            </div>

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
