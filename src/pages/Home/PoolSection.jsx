import { useNavigate } from "react-router-dom";
import "../../styles/Pool.css";

const features = [
  { id: 1, icon: "bi-cup-straw", label: "Pool Beachbar" },
  { id: 2, icon: "bi-water", label: "Infinity Pool" },
  { id: 3, icon: "bi-brightness-high", label: "Sunbeds" },
];

export default function InfinityPoolSection() {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/about"); // 🔥 Redirect to login page
  };

  return (
    <section className="pool-sec">
      {/* Background */}
      <div className="pool-bg" />

      {/* Content */}
      <div className="container py-5 pool-inner">
        <div className="row justify-content-end">
          <div className="col-12 col-lg-6">
            <div className="pool-card text-center">
              <div className="pool-topline mx-auto" />

              <h2 className="pool-title">Infinity Pool</h2>

              <p className="pool-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Donec malesuada lorem maximus mauris scelerisque, at rutrum
                nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus
                finibus.
              </p>

              <div className="row g-4 justify-content-center pool-features">
                {features.map((f) => (
                  <div key={f.id} className="col-4">
                    <div className="pool-feature">
                      <div className="pool-icon">
                        <i className={`bi ${f.icon}`} />
                      </div>
                      <div className="pool-label">{f.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="pool-btn mt-4"
                type="button"
                onClick={handleReadMore}
              >
                Read More
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
