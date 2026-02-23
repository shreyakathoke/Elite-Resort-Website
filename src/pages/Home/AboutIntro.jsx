import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import "../../styles/aboutIntro.css";
import aboutImg from "../../assets/about-intro1.jpg";

export default function AboutIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  const handleReadMore = () => {
    navigate("/login");
  };

  return (
    <section className="aboutIntro">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* LEFT */}
          <div
            className="col-12 col-lg-6"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="aboutIntro-line" data-aos="zoom-in" data-aos-delay="150" />

            <h2 className="aboutIntro-title aboutIntro-reveal" data-aos="fade-up" data-aos-delay="220">
              A place to remember
            </h2>

            <p className="aboutIntro-text" data-aos="fade-up" data-aos-delay="500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec malesuada
              lorem maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula
              sapien. Suspendisse cursus faucibus finibus.
            </p>

            <div data-aos="fade-up" data-aos-delay="420">
              <button className="aboutIntro-btn" type="button" onClick={handleReadMore}>
                Read More
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="col-12 col-lg-6"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <div className="aboutIntro-imgWrap">
              <img className="aboutIntro-img" src={aboutImg} alt="Resort view" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
