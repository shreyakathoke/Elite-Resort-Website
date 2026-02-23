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
  return (
    <section className="service-hero">
      <div
        id="serviceHeroCarousel"
        className="carousel slide carousel-fade service-carousel"
        data-bs-ride="carousel"
        data-bs-interval="4500"
        data-bs-pause="false"
      >
        {/* Indicators */}
        <div className="carousel-indicators service-indicators">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#serviceHeroCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : "false"}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
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

                        <button className="hero-btn" type="button">
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

        {/* Controls */}
        <button
          className="carousel-control-prev service-control"
          type="button"
          data-bs-target="#serviceHeroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next service-control"
          type="button"
          data-bs-target="#serviceHeroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
