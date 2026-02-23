import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/roomsGallerySection.css";

// ✅ Replace these with your real images from src/assets
import r1 from "../../assets/g.jpg";
import r2 from "../../assets/g1.jpg";
import r3 from "../../assets/g2.jpg";
import r4 from "../../assets/g3.jpg";
import r5 from "../../assets/g4.jpg";
import r6 from "../../assets/g5.jpg";
import r7 from "../../assets/g6.jpg";
import r8 from "../../assets/g8.jpg";

export default function RoomsGallerySection() {
  const [active, setActive] = useState("All");
  const gridRef = useRef(null);

  const items = useMemo(
    () => [
      { id: 1, src: r1, title: "Panoramic Suite", tag: "Suites" },
      { id: 2, src: r2, title: "Royal King Room", tag: "Rooms" },
      { id: 3, src: r3, title: "Skyline Deluxe", tag: "Views" },
      { id: 4, src: r4, title: "Executive Comfort", tag: "Rooms" },
      { id: 5, src: r5, title: "Luxury Night Suite", tag: "Suites" },
      { id: 6, src: r6, title: "Modern Classic", tag: "Rooms" },
      { id: 7, src: r7, title: "Premium Blue Suite", tag: "Suites" },
      { id: 8, src: r8, title: "Ruby Cozy Room", tag: "Rooms" },
    ],
    []
  );

  const filters = ["All", "Rooms", "Suites", "Views"];

  const filtered = useMemo(() => {
    if (active === "All") return items;
    return items.filter((x) => x.tag === active);
  }, [active, items]);

  // ✅ Scroll reveal animation
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll("[data-reveal='card']");
    if (!cards?.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <section className="rg-wrap py-5">
      <div className="container">
        {/* Header */}
        <div className="rg-head text-center mb-4">
          <p className="rg-kicker mb-2">Elite Resort • Rooms & Suites</p>
          <h2 className="rg-title">Explore Our Stays</h2>
          <p className="rg-subtitle mx-auto">
            Handcrafted comfort, modern luxury, and breathtaking views—designed for
            a premium resort experience.
          </p>
        </div>

        {/* Filters */}
        <div className="d-flex justify-content-center mb-4">
          <div className="rg-filters">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`rg-filter-btn ${active === f ? "active" : ""}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="row g-4" ref={gridRef}>
          {filtered.map((item, idx) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <article
                className="rg-card"
                data-reveal="card"
                style={{ transitionDelay: `${Math.min(idx, 7) * 70}ms` }}
              >
                <div className="rg-media">
                  <img src={item.src} alt={item.title} className="rg-img" />
                  <div className="rg-overlay" />
                  <div className="rg-badge">{item.tag}</div>
                  <div className="rg-caption">
                    <h6 className="rg-card-title">{item.title}</h6>
                    <span className="rg-card-link">
                      View details <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
