import "../../styles/testimonials.css";
import TestimonialVideo from "../../assets/resortvideo.mp4";

const TESTIMONIALS = [
  {
    rating: 5,
    text:
      "Elite Resort was beyond perfect—clean rooms, calm atmosphere, and truly professional staff. Every detail felt premium and relaxing.",
    name: "Rahul Sharma",
    place: "Mumbai",
  },
  {
    rating: 5,
    text:
      "Munnar Tea Hills Resort was breathtaking. The view from our room was exactly as shown in the pictures.",
    name: "Priya Patel",
    place: "Ahmedabad",
  },
  {
    rating: 4,
    text:
      "Incredible hospitality! The Ayurvedic treatment package recommended by the team was rejuvenating.",
    name: "John Davis",
    place: "London, UK",
  },
];

function Stars({ value = 5 }) {
  const full = Math.max(0, Math.min(5, value));
  return (
    <div className="t-stars" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`t-star ${i < full ? "is-on" : "is-off"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function Card({ rating, text, name, place }) {
  return (
    <div className="t-slideItem">
      <div className="t-card h-100">
        <div className="t-top">
          <Stars value={rating} />
          <div className="t-quotes" aria-hidden="true">
            ❝❞
          </div>
        </div>

        <p className="t-text">“{text}”</p>

        <div className="t-footer">
          <div className="t-name">{name}</div>
          <div className="t-place">{place}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  // ✅ Duplicate array for seamless infinite scrolling
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="t-wrap">
      <div className="container py-5">
        {/* Video */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-10">
            <div className="t-videoWrap">
              <video
                className="t-video"
                src={TestimonialVideo}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="t-videoOverlay"></div>
              <div className="t-videoText">
                <h2>Real Guest Experiences</h2>
                <p>Discover why travelers love Elite Resort.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Sliding Testimonials */}
        <div className="t-slider">
          <div className="t-track">
            {loop.map((t, i) => (
              <Card key={`${t.name}-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}