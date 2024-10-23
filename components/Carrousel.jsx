import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../src/index.css";
import { SlArrowRight } from "react-icons/sl";
import { FaTimes } from "react-icons/fa"; // Importa el ícono de cerrar

const Carrousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageClick = () => {
    setSelectedImage(sortedImages[currentIndex]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  return (
    <div className="carousel" aria-label="Image Carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sortedImages.map((image, index) => (
          <div key={index} className="carousel-item">
            <img
              src={image}
              className="d-block w-100"
              alt={`Slide ${index}`}
              onClick={handleImageClick}
            />
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

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={selectedImage} alt="Imagen en pantalla completa" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

Carrousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default Carrousel;