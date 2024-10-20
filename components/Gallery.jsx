import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import "../src/index.css";
import { useInView } from "react-intersection-observer";

// Importar las imágenes directamente
import img1 from '../src/assets/Concursos/1_Concurso_Urbano_Imagina_Bolivar/1.webp';
import portadaCosta from "../src/assets/Concursos/3_Concurso_Costa_Urbana/1.webp";
import portadaHawa from "../src/assets/Concursos/4_Concurso_HAWA/1.webp";
import portadaSumInta from "../src/assets/Concursos/6_Concurso_SUM_INTA/1.webp";
import portadaSantaFe from "../src/assets/Viviendas/5_Santa_Fe/Renders/1.webp";
import portadaAlberti from "../src/assets/Viviendas/7_Alberti/1.webp";
// import portadaSmata from "../src/assets/Viviendas/9_SMATA/PORTADA.webp";
import portadaEstudioINA from "../src/assets/Comercial/7_Estudio_INA/1.webp";
import portadaBgo from "../src/assets/Comercial/4_Bauness/1.webp";
import portadaTerrada from "../src/assets/Reformas/2_Cocina_Terrada/Renders/1.webp";
import portadaBilbao from "../src/assets/Comercial/3_Local_Francisco_Bilbao/1.webp";
// import portadaPorteniaBar from "../src/assets/Viviendas/3_Porteña_Bar/1.webp";
import portadaTrenesArgentinos from "../src/assets/Comercial/6_Trenes_Argentinos/Renders/1.webp";
// import portadaPorteniaBiblioteca from "../src/assets/Viviendas/3_Porteña_Biblioteca/1.webp";
// import portadaPorteniaLiving from "../src/assets/Viviendas/3_Porteña_Living/1.webp";
// import portadaManuelaPedraza from "../src/assets/Reformas/1_Manuela_Pedraza/Renders/PORTADA.webp";
import portadaDefensaBar from "../src/assets/Comercial/5_Defensa_Bar/1.webp";
import portadaParqueSalguero from "../src/assets/Concursos/2_Concurso_Parque_Salguero/PORTADA.webp";
import portadaOficinasSiconara from "../src/assets/Comercial/1_Oficinas_Siconara/Renders/1.webp";
// import portadaReformaBeruti from "../src/assets/Reformas/3_Reforma_Beruti/1.webp";
import portadaConcursoParqueTecnologico from "../src/assets/Concursos/5_Concurso_Polo_y_Parque_Tecnologico/Renders/1.webp";
import portadaConcursoEducacionDelFuturo from "../src/assets/Concursos/Concurso_Educacion_Del_Futuro/1.webp";

const Gallery = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

  // Usa las imágenes importadas en lugar de las rutas relativas
  const images = [
    { src: img1, srctxt: '../src/assets/Concursos/1_Concurso_Urbano_Imagina_Bolivar/1.webp', text: "CONCURSO Urbano Imagina Bolivar" },
    { src: portadaBgo, srctxt: '../src/assets/Comercial/4_Bauness/1.webp', text: "COMERCIAL BGO" },
    { src: portadaSantaFe, srctxt: '../src/assets/Viviendas/5_Santa_Fe/Renders/1.webp', text: "VIVIENDAS Santa Fe" },
    { src: portadaHawa, srctxt: '../src/assets/Concursos/4_Concurso_HAWA/1.webp', text: "CONCURSO HAWA" },
    { src: portadaBilbao, srctxt: '../src/assets/Comercial/3_Local_Francisco_Bilbao/1.webp', text: "COMERCIAL Bilbao" },
    { src: portadaTerrada, srctxt: '../src/assets/Reformas/2_Cocina_Terrada/1.webp', text: "REFORMAS Cocina Terrada" },
    // { src: portadaPorteniaBar, srctxt: '../src/assets/Viviendas/3_Porteña_Bar/1.webp', text: "VIVIENDAS La Porteña Bar" },
    { src: portadaTrenesArgentinos, srctxt: '../src/assets/Comercial/6_Trenes_Argentinos/Renders/1.webp', text: "COMERCIAL Trenes Argentinos" },
    // { src: portadaPorteniaBiblioteca, srctxt: '../src/assets/Viviendas/3_Porteña_Biblioteca/1.webp', text: "VIVIENDAS La Porteña Biblioteca" },
    // { src: portadaPorteniaLiving, srctxt: '../src/assets/Viviendas/3_Porteña_Living/1.webp', text: "VIVIENDAS La Porteña Living" },
    // { src: portadaManuelaPedraza, srctxt: '../src/assets/Reformas/1_Manuela_Pedraza/Renders/PORTADA.webp', text: "REFORMAS Manuela Pedraza" },
    { src: portadaEstudioINA, srctxt: '../src/assets/Comercial/7_Estudio_INA/1.webp', text: "COMERCIAL Estudio INA" },
    { src: portadaDefensaBar, srctxt: '../src/assets/Comercial/5_Defensa_Bar/1.webp', text: "COMERCIAL Defensa Bar" },
    { src: portadaParqueSalguero, srctxt: '../src/assets/Concursos/2_Concurso_Parque_Salguero/PORTADA.webp', text: "CONSURSOS Parque Salguero" },
    { src: portadaOficinasSiconara, srctxt: '../src/assets/Comercial/1_Oficinas_Siconara/Renders/1.webp', text: "COMERCIAL Oficinas Siconara" },
    // { src: portadaSmata, srctxt: '../src/assets/Viviendas/9_SMATA/PORTADA.webp', text: "VIVIENDAS SMATA" },
    { src: portadaCosta, srctxt: '../src/assets/Concursos/3_Concurso_Costa_Urbana/1.webp', text: "CONCURSO Costa Urbana" },
    // {src:portadaReformaBeruti , srctxt: '../src/assets/Reformas/3_Reforma_Beruti/1.webp', text: "REFORMAS Beruti"},
    { src: portadaAlberti, srctxt: '../src/assets/Viviendas/7_Alberti/1.webp', text: "VIVIENDAS Alberti" },
    { src: portadaConcursoParqueTecnologico, srctxt: '../src/assets/Concursos/5_Concurso_Polo_y_Parque_Tecnologico/Renders/1.webp', text: "CONCURSO Parque y Polo Tecnologico Acindar" },
    { src: portadaSumInta, srctxt: '../src/assets/Concursos/6_Concurso_SUM_INTA/1.webp', text: "CONCURSO SUM INTA" },
    {src:portadaConcursoEducacionDelFuturo , srctxt: '../src/assets/Concursos/Concurso_Educacion_Del_Futuro/1.webp', text: "CONCURSO Educación del Futuro"},
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
