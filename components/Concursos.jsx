import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carrousel from './Carrousel'; // Asegúrate de importar el componente Carrousel
import SkeletonCarrousel from './SkeletonCarrousel'; // Importar el componente SkeletonCarrousel
import "../src/index.css";

const Concursos = () => {
  const { nombreConcurso } = useParams(); // Obtenemos el nombre del concurso desde la URL
  const [imagenesPorCarpeta, setImagenesPorCarpeta] = useState({});
  const [portadaImage, setPortadaImage] = useState(null);
  const [portadaDescription, setPortadaDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [carpetasCargadas, setCarpetasCargadas] = useState({}); // Estado para seguir el progreso de cada carpeta

  useEffect(() => {
    const importarImagenes = async () => {
      try {
        // Cargamos todas las imágenes de todas las carpetas
        const archivos = import.meta.glob(
          "../src/assets/Concursos/**/**/*.{webp,txt}"
        );

        const carpetas = {};
        const carpetasProgreso = {};

        // Inicializamos el estado de carga para cada carpeta
        Object.keys(archivos).forEach(ruta => {
          const partesRuta = ruta.split("/");
          const nombreCarpeta = partesRuta[5]; // Ajustar según la estructura real del path
          if (nombreCarpeta && !carpetasProgreso[nombreCarpeta]) {
            carpetasProgreso[nombreCarpeta] = true; // Se inicia la carga para esa carpeta
          }
        });

        setCarpetasCargadas(carpetasProgreso); // Establecer el estado inicial de carga

        // Procesamos las rutas obtenidas y las filtramos por el concurso
        for (const ruta in archivos) {
          // Filtrar por el nombre del concurso
          if (ruta.includes(nombreConcurso)) {
            const partesRuta = ruta.split("/");
            const nombreCarpeta = partesRuta[5]; // Ajusta según la estructura real del path
            const fileName = partesRuta[5]; // Ajusta según la estructura real del path

            const filePath = await archivos[ruta](); // Resolvemos la imagen o archivo

            // Si estamos en la carpeta del concurso, buscamos la portada y la descripción
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

        // Actualizamos el estado de carga para cada carpeta una vez que están listas
        const carpetasCargadasActualizadas = { ...carpetasProgreso };
        Object.keys(carpetas).forEach(carpeta => {
          carpetasCargadasActualizadas[carpeta] = false; // La carpeta ha terminado de cargar
        });

        setCarpetasCargadas(carpetasCargadasActualizadas);
        setIsLoading(false); // Cambiar el estado de carga global a false
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };

    importarImagenes();
  }, [nombreConcurso]);

  const normalizeName = (name) => {
    return name.replace(/_/g, ' ');
  };

  return (
    <div className="concursos">
      <h1>{normalizeName(nombreConcurso)}</h1>

      {/* Mostrar la portada si está disponible */}
      {portadaImage && (
        <div className="portada">
          <img src={portadaImage} alt="Portada" />
          {portadaDescription && <p>{portadaDescription}</p>}
        </div>
      )}

      {/* Mostrar el skeleton global mientras todo está cargando */}
      {isLoading && (
        <div className="skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-body"></div>
          <div className="skeleton-footer"></div>
        </div>
      )}

      {/* Mostrar las imágenes por carpeta */}
      {Object.keys(imagenesPorCarpeta).map((carpeta, index) => (
        <div key={index}>
          {carpeta !== 'undefined' && <h2>{normalizeName(carpeta)}</h2>}

          {/* Verificamos el estado de carga de cada carpeta */}
          {console.log("Estado de carga de la carpeta", carpeta, carpetasCargadas[carpeta])}

          {/* Mostrar el SkeletonCarrousel si las imágenes de la carpeta aún están cargando */}
          {carpetasCargadas[carpeta] ? (
            <SkeletonCarrousel />
          ) : (
            imagenesPorCarpeta[carpeta] && imagenesPorCarpeta[carpeta].length > 0 && (
              <Carrousel images={imagenesPorCarpeta[carpeta]} />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Concursos;
