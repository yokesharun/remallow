import React, { useState, useEffect } from "react";
import { getPackageInfo } from "../utils/api";

const PackageDetail = ({ name, onClose }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPackageInfo(name)
      .then((data) => setInfo(data))
      .catch(() => setInfo(null))
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="btn btn-sm btn-outline detail-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {loading ? (
          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: 24, color: "var(--accent)" }}></i>
          </div>
        ) : info ? (
          <>
            <h3>{info.name}</h3>
            <p className="detail-desc">{info.description || "No description available"}</p>

            <div className="detail-row">
              <span className="detail-label">Version</span>
              <span className="detail-value">{info.version || info["dist-tags"]?.latest || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">License</span>
              <span className="detail-value">{info.license || "N/A"}</span>
            </div>
            {info.author && (
              <div className="detail-row">
                <span className="detail-label">Author</span>
                <span className="detail-value">
                  {typeof info.author === "string" ? info.author : info.author.name || "N/A"}
                </span>
              </div>
            )}
            {info.homepage && (
              <div className="detail-row">
                <span className="detail-label">Homepage</span>
                <span className="detail-value">
                  <a href={info.homepage} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </span>
              </div>
            )}
            {info.repository && (
              <div className="detail-row">
                <span className="detail-label">Repository</span>
                <span className="detail-value">
                  <a
                    href={typeof info.repository === "string" ? info.repository : info.repository.url?.replace("git+", "").replace(".git", "")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </span>
              </div>
            )}
            {info.keywords && info.keywords.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <span className="detail-label" style={{ display: "block", marginBottom: 8 }}>Keywords</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {info.keywords.slice(0, 12).map((kw) => (
                    <span
                      key={kw}
                      style={{
                        background: "var(--bg-input)",
                        padding: "3px 10px",
                        borderRadius: 4,
                        fontSize: 11,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)" }}>
            Could not load package details
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetail;
