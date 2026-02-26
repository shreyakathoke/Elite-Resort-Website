import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../styles/Header.css";
import logo from "../../assets/logo2.png";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Rooms", path: "/rooms" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => {
    const el = document.getElementById("mainNavbar");
    if (!el) return;

    if (el.classList.contains("show")) {
      const toggler = document.querySelector('[data-bs-target="#mainNavbar"]');
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
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="Elite Resort Logo" className="logo-img" />
            <span className="brand-text">Elite Resort</span>
          </NavLink>

          {/* Desktop CTA */}
          <div className="d-none d-lg-flex ms-auto order-lg-3">
            {/* ✅ make sure /signup route exists */}
            <NavLink to="/about" className="header-cta-btn">
              <span className="btn-text text-white">Make A Reservation</span>
            </NavLink>
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
          <div className="collapse navbar-collapse order-lg-1" id="mainNavbar">
            <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-3">
              {navItems.map((item) => (
                <li className="nav-item" key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active nav-pill" : ""}`
                    }
                    end={item.path === "/"} // ✅ important for home exact match
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div className="mt-3 text-center d-lg-none">
              <NavLink to="/about" onClick={closeMenu} className="header-cta-btn w-100">
                <span className="btn-text text-white">Make A Reservation</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <div className="header-spacer" />
    </header>
  );
}