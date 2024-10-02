import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Concursos = () => {
  const { nombreConcurso } = useParams(); // Obtenemos el nombre del concurso desde la URL
  const [imagenesPorCarpeta, setImagenesPorCarpeta] = useState({});

  useEffect(() => {
    const importarImagenes = async () => {
      try {
        // Cargamos todas las imágenes de todas las carpetas
        const imagenes = import.meta.glob(
          "../src/assets/Concursos/**/**/*.webp"
        );

        const carpetas = {};

        // Procesamos las rutas obtenidas y las filtramos por el concurso
        for (const ruta in imagenes) {
          // Filtrar por el nombre del concurso
          if (ruta.includes(nombreConcurso)) {
            const partesRuta = ruta.split("/");
            const nombreCarpeta = partesRuta[5]; // Ajusta según la estructura real del path

            if (!carpetas[nombreCarpeta]) {
              carpetas[nombreCarpeta] = [];
            }

            const imagen = await imagenes[ruta](); // Resolvemos la imagen
            carpetas[nombreCarpeta].push(imagen.default); // Guardamos la imagen
          }
        }

        setImagenesPorCarpeta(carpetas);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };

    importarImagenes();
  }, [nombreConcurso]);

  return (
    <div>
      <h1>{nombreConcurso}</h1>
      {Object.keys(imagenesPorCarpeta).map((carpeta, index) => (
        <div key={index}>
          <h2>{carpeta}</h2>
          <div className="imagenes-carpeta">
            {imagenesPorCarpeta[carpeta].map((imagen, imgIndex) => (
              <img
                key={imgIndex}
                src={imagen}
                alt={`Imagen ${imgIndex + 1} de ${carpeta}`}
                className="imagen"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Concursos;
