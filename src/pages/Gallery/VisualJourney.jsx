import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "../../styles/visualJourney.css";

import g1 from "../../assets/gallery.jpg";
import g2 from "../../assets/gallery1.jpg";
import g3 from "../../assets/gallery2.jpg";
import g4 from "../../assets/gallery5.jpg";
import g5 from "../../assets/gallery4.jpg";
import g6 from "../../assets/gallery6.jpg";

const IMAGES = {
  big: g1,
  rightTop: g2,
  rightMid: g3,
  bottom1: g4,
  bottom2: g5,
  bottom3: g6,
};

function ImgCard({ src, alt, className = "", aos = "zoom-in", delay = 0 }) {
  return (
    <div className={`vj-card ${className}`} data-aos={aos} data-aos-delay={delay}>
      <div className="vj-img-wrapper">
        <img className="vj-img" src={src} alt={alt} loading="lazy" />
      </div>
      <span className="vj-overlay" aria-hidden="true" />
    </div>
  );
}

export default function VisualJourney() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <section className="vj-section py-5">
      <div className="container py-3">
        {/* Title */}
        <div className="text-center mb-5" data-aos="fade-up">
          <div className="vj-line mx-auto" data-aos="zoom-in" data-aos-delay="120" />
          <h2 className="vj-title" data-aos="fade-up" data-aos-delay="200">
            Elite Gallery
          </h2>
          <p className="vj-subtitle" data-aos="fade-up" data-aos-delay="320">
            Glimpses of the paradise that awaits you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="row g-4">
          {/* Large Left Image */}
          <div className="col-12 col-lg-8">
            <ImgCard
              src={IMAGES.big}
              alt="Resort Backwater View"
              className="vj-big vj-float"
              aos="fade-right"
              delay={150}
            />
          </div>

          {/* Right Stack */}
          <div className="col-12 col-lg-4">
            <div className="row g-4">
              <div className="col-12">
                <ImgCard
                  src={IMAGES.rightTop}
                  alt="Gallery 2"
                  className="vj-rightTop"
                  aos="fade-left"
                  delay={220}
                />
              </div>

              <div className="col-12">
                <ImgCard
                  src={IMAGES.rightMid}
                  alt="Gallery 3"
                  className="vj-rightMid"
                  aos="fade-left"
                  delay={320}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="col-12">
            <div className="row g-4">
              <div className="col-12 col-md-4">
                <ImgCard
                  src={IMAGES.bottom1}
                  alt="Gallery 4"
                  className="vj-small"
                  aos="zoom-in"
                  delay={180}
                />
              </div>

              <div className="col-12 col-md-4">
                <ImgCard
                  src={IMAGES.bottom2}
                  alt="Gallery 5"
                  className="vj-small"
                  aos="zoom-in"
                  delay={260}
                />
              </div>

              <div className="col-12 col-md-4">
                <ImgCard
                  src={IMAGES.bottom3}
                  alt="Gallery 6"
                  className="vj-small"
                  aos="zoom-in"
                  delay={340}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
