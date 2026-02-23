import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "../../styles/galleryMasonry.css";

// Images
import g11 from "../../assets/image1.jpg";
import g13 from "../../assets/image2.jpg";
import g14 from "../../assets/image3.jpg";
import g4 from "../../assets/g3.jpg";
import g5 from "../../assets/g4.jpg";
import g6 from "../../assets/g5.jpg";
import g7 from "../../assets/g6.jpg";
import g8 from "../../assets/room1.jpg";
import g115 from "../../assets/g13.jpg";
import g10 from "../../assets/room3.jpg";

const gallery = [
  { id: 1, src: g11, alt: "Luxury room" },
  { id: 2, src: g13, alt: "Suite interior" },
  { id: 3, src: g14, alt: "Bedroom view" },
  { id: 4, src: g4, alt: "Resort balcony" },
  { id: 5, src: g5, alt: "Resort lobby" },
  { id: 6, src: g6, alt: "Night pool" },
  { id: 7, src: g7, alt: "Outdoor fun" },
  { id: 8, src: g8, alt: "Pool view" },
  { id: 9, src: g115, alt: "Sunset resort" },
  { id: 10, src: g10, alt: "Resort exterior" },
];

export default function GalleryMasonrySection() {
  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
    });

    // helps if images load after AOS init
    setTimeout(() => AOS.refresh(), 200);
  }, []);

  return (
    <section className="gm-sec">
      <div className="container py-5">
        {/* Heading */}
        <div className="gm-head text-center mb-4" data-aos="fade-up">
          <div className="gm-line mx-auto" />
          <h2 className="gm-title">Visual Journey</h2>
          <p className="gm-sub">
            A glimpse of luxury stays, relaxing views, and unforgettable moments.
          </p>
        </div>

        {/* Masonry */}
        <div className="gm-masonry" aria-label="Resort gallery">
          {gallery.map((item, index) => (
            <figure
              key={item.id}
              className="gm-item"
              data-aos="zoom-in"
              data-aos-delay={index * 70}
            >
              <img className="gm-img" src={item.src} alt={item.alt} loading="lazy" />
              <span className="gm-overlay" aria-hidden="true" />
              <figcaption className="gm-caption">{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
