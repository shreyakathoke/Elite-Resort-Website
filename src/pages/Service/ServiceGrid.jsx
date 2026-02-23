import { useEffect, useRef, useState } from "react";
import "../../styles/serviceGrid.css";

const ITEMS = [
  { icon: "bi-bicycle", title: "Bike Rentals" },
  { icon: "bi-water", title: "Boat Trips" },
  { icon: "bi-shop", title: "Restaurants" },
  { icon: "bi-umbrella", title: "Massages" },
  { icon: "bi-ticket-perforated", title: "Event Tickets" },
  { icon: "bi-signpost-split", title: "Hiking" },
];

const TEXT =
  "Nulla massa dui, posuere non erat in, eleifend mattis dui. Vivamus luctus luctus rhoncus. Donec sagittis nulla id finibus iaculis. Mauris odio tortor.";

function ServiceItem({ icon, title, index }) {
  return (
    <div className="col-12 col-md-4">
      <div className="sg-item sg-animate" style={{ animationDelay: `${index * 120}ms` }}>
        <div className="sg-icon">
          <i className={`bi ${icon}`} aria-hidden="true"></i>
        </div>

        <h3 className="sg-title">{title}</h3>

        <p className="sg-text">{TEXT}</p>
      </div>
    </div>
  );
}

export default function ServiceGrid() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={`sg-section py-5 ${visible ? "is-visible" : ""}`}>
      <div className="container py-4">
        <div className="row g-5">
          {ITEMS.map((it, index) => (
            <ServiceItem key={it.title} index={index} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}