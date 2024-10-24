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
        let context = import.meta.glob("../src/assets/**/Renders/*.{webp,txt}");
        const subfoldersSet = new Set();
        const images = {};

        for (const key of Object.keys(context)) {
          const parts = key.split('/');
          const folderIndex = parts.indexOf(titulo);  // Asegúrate de que `titulo` sea exactamente igual a la subcarpeta

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
    return subfolder.replace(/^\d+_/, '').replace(/_/g, ' ');
  };

  const handleProjectClick = (projectType, subfolder) => {
    navigate(`/${projectType}/${subfolder}`);
  };

  return (
    <div className="projects">
      <h1 className="tituloProyecto">{titulo==="Viviendas" ? "Viviendas e interiorismo" : titulo}</h1>

      {/* Mostrar el SkeletonCarrousel mientras las imágenes están cargando */}
      {isLoading ? (
        <SkeletonCarrousel />
      ) : (
        /* Mostrar las imágenes por subcarpeta */
        subfolders.map((subfolder, index) => (
          <div key={index} className="project">
            <h2>{cleanSubfolder(subfolder)}</h2>
            {imagePaths[subfolder] && imagePaths[subfolder].length > 0 && (
              <>
                <Carrousel images={imagePaths[subfolder]} />
                <button className="verMas" onClick={() => handleProjectClick(titulo,subfolder)}>
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