import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SkeletonCarrousel from './SkeletonCarrousel'; // Importar el SkeletonCarrousel
import "../src/index.css";

const Viviendas = () => {
  const { nombreVivienda } = useParams(); // Obtenemos el nombre de la vivienda desde la URL
  const [imagenesPorCarpeta, setImagenesPorCarpeta] = useState({});
  const [portadaImage, setPortadaImage] = useState(null);
  const [portadaDescription, setPortadaDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null); // Estado para la imagen del modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [videoLinks, setVideoLinks] = useState([]); // Estado para guardar los enlaces de los videos

  useEffect(() => {
    const importarImagenes = async () => {
      try {
        // Cargamos todas las imágenes de todas las carpetas
        const archivos = import.meta.glob(
          "../src/assets/Viviendas/**/*.{webp,txt}"
        );

        const carpetas = {};
        let videosEncontrados = [];

        // Procesamos las rutas obtenidas y las filtramos por la vivienda
        for (const ruta in archivos) {
          // Filtrar por el nombre de la vivienda
          if (ruta.includes(nombreVivienda)) {
            const partesRuta = ruta.split("/");
            const nombreCarpeta = partesRuta[5]; // Ajusta según la estructura real del path

            const fileName = partesRuta[5]; // Obtener el nombre del archivo

            const filePath = await archivos[ruta](); // Resolvemos la imagen o archivo

            if (fileName === 'Vids.txt') {
              const response = await fetch(filePath.default);
              const text = await response.text();
              videosEncontrados = text.split("\n").filter(link => link.trim() !== "");
              setVideoLinks(videosEncontrados);
              continue;
            }

            // Si estamos en la carpeta de la vivienda, buscamos la portada y la descripción
            if (fileName === '1.webp') {
              setPortadaImage(filePath.default); // Guardar la portada y continuar
              continue;
            }

            if (fileName === 'Descripcion.txt') {
              const response = await fetch(filePath.default); // Leer el archivo de texto
              const text = await response.text();
              setPortadaDescription(text); // Guardar la descripción y continuar
              continue;
            }

            // Si es una imagen válida y no es la portada, la añadimos a la carpeta correspondiente
            if (!carpetas[nombreCarpeta]) {
              carpetas[nombreCarpeta] = [];
            }
            carpetas[nombreCarpeta].push(filePath.default); // Guardamos la imagen
          }
        }

        setImagenesPorCarpeta(carpetas);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      } finally {
        setIsLoading(false); // Cambiar el estado de carga a false después de procesar
      }
    };

    importarImagenes();
  }, [nombreVivienda]);

  const normalizeName = (name) => {
    return name ? name.replace(/^\d+_/, '').replace(/_/g, ' ') : ''; // Manejar valores undefined o null
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const getYouTubeEmbedUrl = (url) => {
    let videoId = '';
    if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('shorts/')[1].split('?')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&controls=0&rel=0`;
  };

  return (
    <div className="viviendas">
      <h1 className="tituloVivienda">{normalizeName(nombreVivienda)}</h1>
      {/* Mostrar la portada si está disponible */}
      {portadaImage && (
        <div className="portada">
          <img src={portadaImage} alt="Portada" />
          {portadaDescription && <p>{portadaDescription}</p>}
        </div>
      )}

      {/* Mostrar el SkeletonCarrousel mientras las imágenes están cargando */}
      {isLoading ? (
        <SkeletonCarrousel />
      ) : (
        /* Mostrar las imágenes por carpeta */
        <>
          <div className="image-grid">
            {Object.keys(imagenesPorCarpeta).map((carpeta, index) => (
              <div key={index} className="carpeta-items">
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
                    width="auto"
                    height="auto"
                    src={getYouTubeEmbedUrl(link)}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                    allowFullScreen
                    style={{ borderRadius: "6px", width: "100%", maxWidth: "220px" }}
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

export default Viviendas;