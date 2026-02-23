import "../../styles/abouthero.css";

// ✅ Import video correctly
import resortVideo from "../../assets/resortvideo.mp4";

// ✅ Import images
import wellnessImg from "../../assets/hero1.jpg";
import spaImg from "../../assets/Hero2.jpg";
import loungeImg from "../../assets/hero3.jpg";

const CARDS = [
  {
    title: "Wellness",
    desc:
      "Malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus.",
    img: wellnessImg,
    icon: "bi bi-sunrise",
  },
  {
    title: "Spa Center",
    desc:
      "Malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus.",
    img: spaImg,
    icon: "bi bi-droplet",
  },
  {
    title: "Lounge Bar",
    desc:
      "Malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus.",
    img: loungeImg,
    icon: "bi bi-cup-straw",
  },
];

function ServiceCard({ title, desc, img, icon }) {
  return (
    <div className="col-12 col-md-4">
      <div className="ss-card">
        <img src={img} alt={title} className="ss-bg" />

        <div className="ss-panel">
          <div className="ss-iconWrap">
            <i className={icon}></i>
          </div>

          <h3 className="ss-title">{title}</h3>
          <p className="ss-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Abouthero() {
  return (
    <section className="services-showcase">
      <div className="container py-5">

        {/* ================= VIDEO ================= */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-10">
            <div className="ss-videoWrap">
              <video
                className="ss-video"
                src={resortVideo}
                autoPlay
                muted
                loop
                playsInline
              ></video>

              <div className="ss-videoOverlay"></div>

              <div className="ss-videoText">
                <h2>Experience Elite Resort</h2>
                <p>At Elite Resort, we redefine luxury with thoughtfully designed spaces, premium amenities, and personalized hospitality.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="row g-4 justify-content-center">
          {CARDS.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}
        </div>

      </div>
    </section>
  );
}
