import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SkeletonCarrousel from './SkeletonCarrousel'; // Importar el SkeletonCarrousel
import "../src/index.css";

const Comercial = () => {
  const { nombreComercial } = useParams(); // Obtenemos el nombre de la reforma desde la URL
  const [imagenesPorCarpeta, setImagenesPorCarpeta] = useState({});
  const [portadaImage, setPortadaImage] = useState(null);
  const [portadaDescription, setPortadaDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null); // Estado para la imagen del modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const importarImagenes = async () => {
      try {
        // Cargamos todas las imágenes de todas las carpetas
        const archivos = import.meta.glob(
          "../src/assets/Comercial/**/*.{webp,txt}"
        );

        const carpetas = {};

        // Procesamos las rutas obtenidas y las filtramos por la reforma
        for (const ruta in archivos) {
          // Filtrar por el nombre de la reforma
          if (ruta.includes(nombreComercial)) {
            const partesRuta = ruta.split("/");
            const nombreCarpeta = partesRuta[5]; // Ajusta según la estructura real del path
            
            const fileName = partesRuta[5]; // Obtener el nombre del archivo

            const filePath = await archivos[ruta](); // Resolvemos la imagen o archivo

            // Si estamos en la carpeta de la reforma, buscamos la portada y la descripción
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

        console.log("Imágenes cargadas:", carpetas); // Verificar las imágenes cargadas
        setImagenesPorCarpeta(carpetas);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      } finally {
        setIsLoading(false); // Cambiar el estado de carga a false después de procesar
      }
    };

    importarImagenes();
  }, [nombreComercial]);

  const normalizeName = (name) => {
    return name.replace(/^\d+_/, '').replace(/_/g, ' ');
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
    <div className="comercial">
      <h1 className="tituloReforma">{normalizeName(nombreComercial)}</h1>
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

export default Comercial;