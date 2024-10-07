import React, { useState } from "react";
import PropTypes from "prop-types";
import "../src/index.css";
import { SlArrowRight } from "react-icons/sl";

const Carrousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesToShow = images.length > 0 ? images : [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ];

  // Ordenar las imágenes por el nombre del archivo en orden ascendente
  const sortedImages = imagesToShow.sort((a, b) => {
    const nameA = a.split('/').pop().split('.')[0]; // Obtener el nombre del archivo sin extensión
    const nameB = b.split('/').pop().split('.')[0]; // Obtener el nombre del archivo sin extensión
    return parseInt(nameA) - parseInt(nameB); // Comparar como números
  });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sortedImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sortedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel" aria-label="Image Carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sortedImages.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} className="d-block w-100" alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <SlArrowRight className="carousel-control-prev-icon" />
      </button>
      <button
        className="carousel-control-next"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <SlArrowRight className="carousel-control-next-icon" />
      </button>
      <div className="carousel-thumbnails">
        {sortedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            className={`thumbnail ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleThumbnailClick(index)}
            alt={`Thumbnail ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

Carrousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default Carrousel;