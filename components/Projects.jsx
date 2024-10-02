import React, { useState, useEffect } from "react";
import Carrousel from "./Carrousel";
import SkeletonCarrousel from "./SkeletonCarrousel"; // Importar el SkeletonCarrousel
import { useNavigate } from "react-router-dom";
import "../src/index.css";

const Projects = ({ titulo }) => {
  const [subfolders, setSubfolders] = useState([]);
  const [imagePaths, setImagePaths] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSubfolders = async () => {
      try {
        const context = import.meta.glob("../src/assets/**/Renders/*.{webp,txt}");
        console.log("Rutas encontradas con glob:", Object.keys(context));

        const subfoldersSet = new Set();
        const images = {};

        for (const key of Object.keys(context)) {
          const parts = key.split('/');
          console.log("Partes de la ruta:", parts);
          const folderIndex = parts.indexOf(titulo);  // Asegúrate de que `titulo` sea exactamente igual a la subcarpeta
          console.log(`Buscando la carpeta ${titulo} en:`, parts, "Índice:", folderIndex);

          if (folderIndex !== -1) {
            const subfolder = parts[folderIndex + 1];
            subfoldersSet.add(subfolder);

            const filePath = await context[key]();
            if (!images[subfolder]) {
              images[subfolder] = [];
            }
            images[subfolder].push(filePath.default);
          }
        }

        setSubfolders(Array.from(subfoldersSet));
        setImagePaths(images);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSubfolders();
  }, [titulo]);

  const cleanSubfolder = (subfolder) => {
    return subfolder.replace(/_/g, " ");
  };

  const handleProjectClick = (subfolder) => {
    navigate(`/concursos/${subfolder}`);
  };

  return (
    <div className="projects">
      <h1 className="tituloProyecto">{titulo}</h1>

      {/* Mostrar el SkeletonCarrousel mientras las imágenes están cargando */}
      {isLoading ? (
        <SkeletonCarrousel />
      ) : (
        /* Mostrar las imágenes por subcarpeta */
        subfolders.map((subfolder, index) => (
          <div key={index}>
            <h2>{cleanSubfolder(subfolder)}</h2>
            {imagePaths[subfolder] && imagePaths[subfolder].length > 0 && (
              <>
                <Carrousel images={imagePaths[subfolder]} />
                <button className="verMas" onClick={() => handleProjectClick(subfolder)}>
                  Ver más
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;