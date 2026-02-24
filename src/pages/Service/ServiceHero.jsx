import { useNavigate } from "react-router-dom";
import "../../styles/serviceHero.css";

const SLIDES = [
  {
    bg: "/service.jpg",
    title: "A place to remember",
    text:
      "Elite Resort offers world-class hospitality where luxury meets tranquility. From curated experiences to premium amenities, every moment is designed to make your stay unforgettable.",
  },
  {
    bg: "/bg4.jpg",
    title: "Luxury in every moment",
    text:
      "Relax in elegant suites, enjoy breathtaking views, and experience personalized service crafted to make every day feel effortless and special.",
  },
  {
    bg: "/pool.jpg",
    title: "Designed for comfort",
    text:
      "From wellness to adventure, our services are thoughtfully created to elevate your stay with comfort, care, and unforgettable experiences.",
  },
];

export default function ServiceHero() {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/about");
  };

  return (
    <section className="service-hero">
      <div
        id="serviceHeroCarousel"
        className="carousel slide carousel-fade service-carousel"
        data-bs-ride="carousel"
        data-bs-interval="4500"
        data-bs-pause="false"
      >
        <div className="carousel-inner">
          {SLIDES.map((s, idx) => (
            <div
              key={s.title}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <div
                className="service-hero-slide d-flex align-items-center"
                style={{ backgroundImage: `url(${s.bg})` }}
              >
                <div className="service-hero-overlay" />

                <div className="container position-relative">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-8">
                      <div className="hero-box text-center">
                        <div className="hero-line"></div>

                        <h1 className="hero-title">{s.title}</h1>

                        <p className="hero-subtitle">{s.text}</p>

                        <button
                          className="hero-btn"
                          type="button"
                          onClick={handleReadMore}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}