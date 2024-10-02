import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import "../src/index.css";
import { useInView } from "react-intersection-observer";

// Importar las imágenes directamente
import img1 from '../src/assets/Concursos/Concurso_Urbano_Imagina_Bolivar/1.webp';
import img2 from '../src/assets/Concursos/Concurso_Biblioteca_Sarmiento/1.webp';
import portadaCosta from "../src/assets/Concursos/Concurso_Costa_Urbana/1.webp";
import portadaHawa from "../src/assets/Concursos/Concurso_HAWA/1.webp";
import portadaSumInta from "../src/assets/Concursos/Concurso_SUM_INTA/1.webp";
import portadaSantaFe from "../src/assets/Viviendas/Santa_Fe/1.webp";
import portadaAlberti from "../src/assets/Viviendas/Alberti/1.webp";
import portadaSanSebastian from "../src/assets/Viviendas/San_Sebastian_A1/1.webp";
import portadaSmata from "../src/assets/Viviendas/SMATA/1.webp";
import portadaEstudioINA from "../src/assets/Comercial/Estudio_INA/1.webp";
import portadaDino from "../src/assets/Comercial/DINO/1.webp";
import portadaManuela from "../src/assets/Reformas/Manuela_Pedraza/Renders/1.webp";
import portadaTerrada from "../src/assets/Reformas/Cocina_Terrada/1.webp";

const Gallery = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

  // Usa las imágenes importadas en lugar de las rutas relativas
  const images = [
    { src: img1, srctxt: '../src/assets/Concursos/Concurso_Urbano_Imagina_Bolivar/1.webp', text: "CONCURSO Urbano Imagina Bolivar" },
    { src: img2, srctxt: '../src/assets/Concursos/Concurso_Biblioteca_Sarmiento/1.webp', text: "CONCURSO Biblioteca Sarmiento" },
    { src: portadaCosta, srctxt: '../src/assets/Concursos/Concurso_Costa_Urbana/1.webp', text: "CONCURSO Costa Urbana" },
    { src: portadaHawa, srctxt: '../src/assets/Concursos/Concurso_HAWA/1.webp', text: "CONCURSO HAWA" },
    { src: portadaSumInta, srctxt: '../src/assets/Concursos/Concurso_SUM_INTA/1.webp', text: "CONCURSO SUM INTA" },
    { src: portadaSantaFe, srctxt: '../src/assets/Viviendas/Santa_Fe/1.webp', text: "VIVIENDAS Santa Fe" },
    { src: portadaAlberti, srctxt: '../src/assets/Viviendas/Alberti/1.webp', text: "VIVIENDAS Alberti" },
    { src: portadaSanSebastian, srctxt: '../src/assets/Viviendas/San_Sebastian_A1/1.webp', text: "VIVIENDAS San Sebastian" },
    { src: portadaSmata, srctxt: '../src/assets/Viviendas/SMATA/1.webp', text: "VIVIENDAS SMATA" },
    { src: portadaEstudioINA, srctxt: '../src/assets/Comercial/Estudio_INA/1.webp', text: "COMERCIAL Estudio INA" },
    { src: portadaDino, srctxt: '../src/assets/Comercial/DINO/1.webp', text: "COMERCIAL DINO" },
    { src: portadaManuela, srctxt: '../src/assets/Reformas/Manuela_Pedraza/Renders/1.webp', text: "REFORMAS Manuela Pedraza" },
    { src: portadaTerrada, srctxt: '../src/assets/Reformas/Cocina_Terrada/1.webp', text: "REFORMAS Cocina Terrada" }
    
  ];

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };
  const handleClick = (image) => {
    const folderName = image.srctxt.split('/')[3]; // Extraer el nombre de la carpeta dinámica
    const projectName = image.srctxt.split('/')[4]; // Extraer el nombre del proyecto
    navigate(`/${folderName}/${projectName}`);
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
            onClick={() => handleClick(image)}
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
