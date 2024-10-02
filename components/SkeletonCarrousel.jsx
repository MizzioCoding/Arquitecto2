import React from "react";
import "../src/index.css";

const SkeletonCarrousel = () => {
  return (
    <div className="skeleton-carrousel">
      <div className="skeleton-slide"></div>
      <div className="skeleton-slide"></div>
      <div className="skeleton-slide"></div>
    </div>
  );
};

export default SkeletonCarrousel;
