import "../../styles/wellnessCards.css";

import wellnessImg from "../../assets/hero1.jpg";
import spaImg from "../../assets/Hero2.jpg";
import loungeImg from "../../assets/hero3.jpg";

const CARDS = [
  {
    title: "Wellness",
    desc:
      "Malesuada lorem maximus\nmauris scelerisque, at rutrum\nnulla dictum. Ut ac ligula\nsapien. Suspendisse cursus\nfaucibus finibus.",
    img: wellnessImg,
    icon: "bi bi-sunrise",
  },
  {
    title: "Spa Center",
    desc:
      "Malesuada lorem maximus\nmauris scelerisque, at rutrum\nnulla dictum. Ut ac ligula\nsapien. Suspendisse cursus\nfaucibus finibus.",
    img: spaImg,
    icon: "bi bi-droplet",
  },
  {
    title: "Lounge Bar",
    desc:
      "Malesuada lorem maximus\nmauris scelerisque, at rutrum\nnulla dictum. Ut ac ligula\nsapien. Suspendisse cursus\nfaucibus finibus.",
    img: loungeImg,
    icon: "bi bi-palm-tree",
  },
];

function Card({ title, desc, img, icon }) {
  return (
    <div className="col-12 col-md-4">
      <div className="wc-card">
        <img className="wc-bg" src={img} alt={title} />

        <div className="wc-panel">
          <div className="wc-icon">
            <i className={icon} aria-hidden="true"></i>
          </div>

          <h3 className="wc-title">{title}</h3>

          <p className="wc-text">
            {desc.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WellnessCards() {
  return (
    <section className="wc-section py-5">
      <div className="container py-4">
        <div className="row g-4">
          {CARDS.map((c) => (
            <Card key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
