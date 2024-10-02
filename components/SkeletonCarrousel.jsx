import React from "react";
import "../src/index.css";

const SkeletonCarrousel = () => {
  return (
    <div className="carousel skeleton" aria-label="Loading Skeleton Carousel">
      <div className="carousel-inner">
        {/* Elemento que simula el contenido cargando */}
        <div className="carousel-item">
          <div className="skeleton-image"></div>
        </div>
        <div className="carousel-item">
          <div className="skeleton-image"></div>
        </div>
        <div className="carousel-item">
          <div className="skeleton-image"></div>
        </div>
      </div>
      <button className="carousel-control-prev" aria-label="Previous Slide" disabled>
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" aria-label="Next Slide" disabled>
        <span className="carousel-control-next-icon"></span>
      </button>
      <div className="carousel-thumbnails">
        <div className="skeleton-thumbnail"></div>
        <div className="skeleton-thumbnail"></div>
        <div className="skeleton-thumbnail"></div>
      </div>
    </div>
  );
};

export default SkeletonCarrousel;
