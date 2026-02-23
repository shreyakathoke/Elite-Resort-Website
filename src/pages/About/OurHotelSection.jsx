import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "../../styles/ourHotelSection.css";

import figure1 from "../../assets/figure1.jpg";
import figure2 from "../../assets/figure2.jpg";
import g5 from "../../assets/g4.jpg";

const COL1 = [
  "Luxury rooms with premium interiors",
  "24/7 concierge and room service",
  "High-speed Wi-Fi & smart amenities",
];

const COL2 = [
  "Infinity pool & sunset deck",
  "Fine dining & coastal cuisine",
  "Spa, fitness & wellness center",
];

const COL3 = [
  "Airport pickup on request",
  "Guided local experiences",
  "Family-friendly stay options",
];

function CheckItem({ text, delay = 0 }) {
  return (
    <li className="oh-item" data-aos="fade-up" data-aos-delay={delay}>
      <span className="oh-check" aria-hidden="true">
        ✓
      </span>
      <span className="oh-text">{text}</span>
    </li>
  );
}

function ImgCard({ src, alt, delay = 0 }) {
  return (
    <div className="oh-imgWrap" data-aos="zoom-in" data-aos-delay={delay}>
      <img className="oh-img" src={src} alt={alt} loading="lazy" />
      <span className="oh-imgOverlay" aria-hidden="true" />
    </div>
  );
}

export default function OurHotelSection() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
    });
  }, []);

  return (
    <section className="our-hotel py-5">
      <div className="container py-4">
        {/* Title */}
        <div className="row">
          <div className="col-12 text-center" data-aos="fade-up">
            <div className="oh-line mx-auto" data-aos="zoom-in" data-aos-delay="120" />
            <h2 className="oh-title" data-aos="fade-up" data-aos-delay="200">
              Our Hotel
            </h2>
            <p className="oh-sub" data-aos="fade-up" data-aos-delay="320">
              Premium comfort, curated experiences, and beautiful spaces designed for
              unforgettable stays.
            </p>
          </div>
        </div>

        {/* Bullet lists */}
        <div className="row justify-content-center gy-4 mt-3">
          <div className="col-12 col-md-4">
            <ul className="oh-list">
              {COL1.map((t, i) => (
                <CheckItem key={t} text={t} delay={120 + i * 110} />
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <ul className="oh-list">
              {COL2.map((t, i) => (
                <CheckItem key={t} text={t} delay={160 + i * 110} />
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <ul className="oh-list">
              {COL3.map((t, i) => (
                <CheckItem key={t} text={t} delay={200 + i * 110} />
              ))}
            </ul>
          </div>
        </div>

        {/* Images */}
        <div className="row gy-4 mt-4">
          <div className="col-12 col-md-4">
            <ImgCard src={figure1} alt="Elite Resort experience" delay={150} />
          </div>

          <div className="col-12 col-md-4">
            <ImgCard src={figure2} alt="Elite Resort pool" delay={250} />
          </div>

          <div className="col-12 col-md-4">
            <ImgCard src={g5} alt="Elite Resort bar" delay={350} />
          </div>
        </div>
      </div>
    </section>
  );
}
