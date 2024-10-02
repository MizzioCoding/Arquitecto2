import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import "../src/index.css";
import { useInView } from "react-intersection-observer";

const Gallery = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

  const images = [
    { src: "../src/assets/Concursos/Concurso_Urbano_Imagina_Bolivar/1.webp", text: "CONCURSO Urbano Imagina Bolivar" },
    { src: "../src/assets/Concursos/Concurso_Biblioteca_Sarmiento/1.webp", text: "CONCURSO Urbano Imagina Bolivar" },
  ];

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="gallery">
      <div className="gallery-container">
        {images.slice(0, visibleCount).map((image, index) => (
          <LazyImage
            key={index}
            src={image.src}
            alt={`Imagen ${index + 1}`}
            text={image.text}
            onClick={() => navigate("/concursos/" + image.src.split('/')[4])}
          />
        ))}
      </div>
      {visibleCount < images.length && (
        <button className="load-more" onClick={handleLoadMore}>
          Ver más
          <GoChevronDown size={20} />
        </button>
      )}
    </div>
  );
};

const LazyImage = ({ src, alt, text, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="gallery-item" onClick={onClick} style={{ cursor: 'pointer' }} ref={ref}>
      {inView ? <img src={src} alt={alt} /> : <div className="placeholder" />}
      <div className="overlay">
        <span className="text_2">{text}</span>
      </div>
    </div>
  );
};

export default Gallery;
