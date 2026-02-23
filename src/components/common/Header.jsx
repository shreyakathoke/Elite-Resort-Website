import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Header.css";
import logo from "../../assets/logo2.png";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Rooms", path: "/rooms" },   // ✅ Replaced Pages with Rooms
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    const el = document.getElementById("mainNavbar");
    if (!el) return;

    if (el.classList.contains("show")) {
      const toggler = document.querySelector(
        '[data-bs-target="#mainNavbar"]'
      );
      toggler?.click();
    }
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top header-nav">
        <div className="container">

          {/* Brand */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="Elite Resort Logo" className="logo-img" />
            <span className="brand-text">Elite Resort</span>
          </Link>

          {/* Desktop CTA */}
          <div className="d-none d-lg-flex ms-auto order-lg-3">
            <Link to="/signup" className="header-cta-btn">
              <span className="btn-text text-white">
                Make A Reservation
              </span>
            </Link>
          </div>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler border-0 ms-2 order-lg-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div
            className="collapse navbar-collapse order-lg-1"
            id="mainNavbar"
          >
            <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-3">

              {navItems.map((item) => (
                <li className="nav-item" key={item.name}>
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={`nav-link ${
                      isActive(item.path) ? "active nav-pill" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>

            {/* Mobile CTA */}
            <div className="mt-3 text-center d-lg-none">
              <Link
                to="/signup"
                onClick={closeMenu}
                className="header-cta-btn w-100"
              >
                <span className="btn-text text-white">
                  Make A Reservation
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="header-spacer" />
    </header>
  );
}
