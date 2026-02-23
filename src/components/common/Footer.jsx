import "../../styles/Footer.css";
import footerMap from "../../assets/footer-map.png";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="container py-5">
        <div className="row gy-5 align-items-start footer-lg-row">
          <div className="col-12 col-lg-4">
            <div className="footer-brand d-flex align-items-center gap-2 mb-4">
              <span className="footer-brand-icon" aria-hidden="true">
                <i className="bi bi-diamond"></i>
              </span>
              <span className="footer-brand-name">Elite Resort</span>
            </div>

            <p className="footer-text">
              Escape to a world where luxury meets tranquility. At Elite Resort,
              every sunrise greets you with breathtaking views and every sunset
              whispers serenity...
            </p>
          </div>

          <div className="col-12 col-lg-4">
            <h6 className="footer-title text-center text-lg-start">
              Find us on the map
            </h6>
            

            <div className="map-wrap mt-3">
              
              <img src={footerMap} alt="World map" className="map-img" />

              <span className="map-dot d1" />
              <span className="map-dot d2" />
              <span className="map-dot d3" />
              <span className="map-dot d4" />
            </div>
          </div>

          <div className="col-12 col-lg-4">
            

            <form className="newsletter mt-3" onSubmit={(e) => e.preventDefault()}>
              <h6 className="footer-title text-center text-lg-start">
              Subscribe to our newsletter
            </h6>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your E-mail"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom mt-5 pt-4">
          <div className="footer-copy text-center text-lg-start">
            Copyright ©2026 All rights reserved | This template is made with{" "}
            <span className="heart">♥</span> by Colorlib
          </div>
        </div>
      </div>

      <button type="button" className="to-top-btn" onClick={scrollToTop} aria-label="Back to top">
        <i className="bi bi-chevron-up"></i>
      </button>
    </footer>
  );
}
