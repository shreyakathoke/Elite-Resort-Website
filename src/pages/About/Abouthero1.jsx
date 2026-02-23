import { useEffect, useRef, useState } from "react";
import "../../styles/abouthero1.css";

const STATS = [
  { icon: "bi-cup-straw", value: 231, label: "Cocktails/day" },
  { icon: "bi-water", value: 3, label: "Pools" },
  { icon: "bi-building", value: 79, label: "Rooms" },
  { icon: "bi-shop-window", value: 25, label: "Apartments" },
];

function useCountUpOnce(target, startAnim, durationMs = 900) {
  const [val, setVal] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startAnim || hasAnimated.current) return;

    hasAnimated.current = true;

    let rafId = 0;
    const start = performance.now();
    const from = 0;
    const to = Number(target);

    const tick = (time) => {
      const progress = Math.min((time - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(from + (to - from) * eased);

      setVal(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setVal(to);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [target, startAnim, durationMs]);

  return val;
}

function StatCard({ icon, value, label, startAnim }) {
  const animated = useCountUpOnce(value, startAnim, 900);

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="milestone-card h-100">
        <div className="milestone-icon">
          <i className={`bi ${icon}`} />
        </div>

        <div className="milestone-number">{animated}</div>
        <div className="milestone-label">{label}</div>
      </div>
    </div>
  );
}

export default function Abouthero1() {
  const sectionRef = useRef(null);
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnim(true);
          io.disconnect(); // ✅ run only once
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="milestones"
      style={{
        /* ✅ Vite correct path for public image */
        "--bg": `url("/pool.jpg")`,
      }}
    >
      <div className="milestones-overlay" />

      <div className="container position-relative">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-lg-9">
            <div className="milestones-head">
              {/* Remove if you don't want it */}
              {/* <span className="milestones-kicker">Elite Resort</span> */}

              <h2 className="milestones-title">Elite Resort in Numbers</h2>


              <p className="milestones-subtitle">
                At Elite Resort, we believe that true luxury lies in comfort, tranquility, and unforgettable moments. Surrounded by stunning landscapes and peaceful surroundings, our resort offers a harmonious blend of elegance and relaxation. Whether you are enjoying a sunset cocktail, unwinding by the pool, or retreating to your stylish suite, every experience is designed to refresh your mind and elevate your stay.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-2">
          {STATS.map((s) => (
            <StatCard
              key={s.label}
              icon={s.icon}
              value={s.value}
              label={s.label}
              startAnim={startAnim}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
