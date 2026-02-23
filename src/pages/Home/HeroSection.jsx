import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/hero.css";

const slides = [
  { id: 1, src: "/hero-background.jpg", theme: "one" },
  { id: 2, src: "/hero-background2.jpg", theme: "two" },
  { id: 3, src: "/bg4.jpg", theme: "three" },
  { id: 4, src: "/hero-background.jpg", theme: "four" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 🔥 Re-trigger text animation on slide change
  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [current]);

  const goTo = (index) => setCurrent(index);

  const handleReadMore = () => {
    navigate("/about");
  };

  const activeTheme = slides[current]?.theme || "one";

  return (
    <section className={`hero hero-theme-${activeTheme}`}>
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-bg ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.src})` }}
        />
      ))}

      <div className="hero-overlay" />

      <div className="container hero-inner">
        {/* Key forces animation restart */}
        <div key={animateKey} className="hero-card text-center hero-animate">
          <div className="hero-line" />

          <h1 className="hero-title">Enjoy Your Life</h1>

          <p className="hero-subtitle">
            Luxury stays crafted for comfort, elegance, and unforgettable memories.
            Wake up to breathtaking views, unwind in beautifully designed spaces,
            and experience hospitality that feels effortlessly refined.
          </p>

          <div className="hero-actions">
            <button
              className="hero-cta"
              type="button"
              onClick={handleReadMore}
            >
              Read More <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Slide Numbers */}
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`hero-dot ${index === current ? "active" : ""}`}
              type="button"
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="hero-progress">
          <div
            key={current}
            className="hero-progress-bar"
            style={{ animationDuration: "5s" }}
          />
        </div>
      </div>
    </section>
  );
}
