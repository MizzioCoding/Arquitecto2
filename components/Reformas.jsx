import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SkeletonCarrousel from './SkeletonCarrousel';
import "../src/index.css";

const Reformas = () => {
  const { nombreReforma } = useParams();
  const [imagenesPorCarpeta, setImagenesPorCarpeta] = useState({});
  const [videoLinks, setVideoLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null); // Estado para la imagen del modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const importarRecursos = async () => {
      try {
        const archivos = import.meta.glob(
          "../src/assets/Reformas/**/**/*.{webp,txt}"
        );

        const carpetas = {};
        let videosEncontrados = [];

        for (const ruta in archivos) {
          if (ruta.includes(nombreReforma)) {
            const partesRuta = ruta.split("/");
            const nombreCarpeta = partesRuta[5];

            const fileName = partesRuta[6];

            const filePath = await archivos[ruta]();

            if (fileName === 'Vids.txt') {
              const response = await fetch(filePath.default);
              const text = await response.text();
              videosEncontrados = text.split("\n").filter(link => link.trim() !== "");
              setVideoLinks(videosEncontrados);
              continue;
            }

            if (!carpetas[nombreCarpeta]) {
              carpetas[nombreCarpeta] = [];
            }
            carpetas[nombreCarpeta].push(filePath.default);
          }
        }

        setImagenesPorCarpeta(carpetas);
      } catch (error) {
        console.error("Error al cargar las imágenes o videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    importarRecursos();
  }, [nombreReforma]);

  const normalizeName = (name) => {
    return name.replace(/_/g, ' ');
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="reformas">
      <h1 className="tituloReforma">{normalizeName(nombreReforma)}</h1>

      {isLoading ? (
        <SkeletonCarrousel />
      ) : (
        <>
          <div className="image-grid">
            {Object.keys(imagenesPorCarpeta).map((carpeta, index) => (
              <div key={index} className="imagenCard">
                {imagenesPorCarpeta[carpeta] && imagenesPorCarpeta[carpeta].length > 0 && (
                  imagenesPorCarpeta[carpeta].map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Imagen ${imgIndex + 1}`}
                      className="image-item"
                      onClick={() => openModal(image)} // Abrir el modal al hacer clic en la imagen
                    />
                  ))
                )}
              </div>
            ))}
          </div>

          {videoLinks.length > 0 && (
            <>
              <h2>Videos</h2>

              <div className="videos">
                {videoLinks.map((link, index) => (
                  <iframe
                    key={index}
                    width="100%"
                    height="100%"
                    src={link.replace("shorts/", "embed/")}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: "6px" }}
                  ></iframe>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Modal para mostrar la imagen en pantalla completa */}
      {isModalOpen && (
        <div className="modal">
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={modalImage} alt="Imagen en pantalla completa" />
        </div>
      )}
    </div>
  );
};

export default Reformas;