import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carrousel from './Carrousel'; // Asegúrate de importar el componente Carrousel
import SkeletonCarrousel from './SkeletonCarrousel'; // Importar el SkeletonCarrousel
import "../src/index.css";

const Concursos = () => {
  const { nombreConcurso } = useParams(); // Obtenemos el nombre del concurso desde la URL
  const [imagenesPorCarpeta, setImagenesPorCarpeta] = useState({});
  const [portadaImage, setPortadaImage] = useState(null);
  const [portadaDescription, setPortadaDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const importarImagenes = async () => {
      try {
        // Cargamos todas las imágenes de todas las carpetas
        const archivos = import.meta.glob(
          "../src/assets/Concursos/**/**/*.{webp,txt}"
        );

        const carpetas = {};

        // Procesamos las rutas obtenidas y las filtramos por el concurso
        for (const ruta in archivos) {
          // Filtrar por el nombre del concurso
          if (ruta.includes(nombreConcurso)) {
            const partesRuta = ruta.split("/");
            const nombreCarpeta = partesRuta[5]; // Ajusta según la estructura real del path
            
            const fileName = partesRuta[5]; // Obtener el nombre del archivo

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
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      } finally {
        setIsLoading(false); // Cambiar el estado de carga a false después de procesar
      }
    };

    importarImagenes();
  }, [nombreConcurso]);

  const normalizeName = (name) => {
    return name.replace(/_/g, ' ');
  };

  return (
    <div className="concursos">
      <h1 className="tituloConcurso">{normalizeName(nombreConcurso)}</h1>
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
        Object.keys(imagenesPorCarpeta).map((carpeta, index) => (
          <div key={index}>
            {carpeta !== 'undefined' && <h2>{normalizeName(carpeta)}</h2>}
            {imagenesPorCarpeta[carpeta] && imagenesPorCarpeta[carpeta].length > 0 && (
              <Carrousel images={imagenesPorCarpeta[carpeta]} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Concursos;
