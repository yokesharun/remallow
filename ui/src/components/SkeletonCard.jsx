import React from "react";

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line short"></div>
    <div className="skeleton-line shorter"></div>
  </div>
);

const SkeletonGrid = ({ count = 6 }) => (
  <div className="package-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export { SkeletonCard, SkeletonGrid };
export default SkeletonGrid;
