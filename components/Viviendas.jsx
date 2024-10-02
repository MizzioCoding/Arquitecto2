import React, { useState, useEffect } from "react";
import Carrousel from "./Carrousel"; // Ensure this component exists and works correctly
import { useLocation, useParams } from "react-router-dom";

const Viviendas = () => {
    const location = useLocation();
    const { project } = useParams();
    const { src } = location.state;
    const [imagesByFolder, setImagesByFolder] = useState({});
    const [portadaImage, setPortadaImage] = useState(null);
    const [portadaDescription, setPortadaDescription] = useState("");

    useEffect(() => {
        const loadImages = async () => {
            // Remove the last part of the path after the last '/'
            const folderPath = src.substring(0, src.lastIndexOf('/')) + '/';

            // Construct the correct path for import.meta.glob
            const context = import.meta.glob('../src/assets/Viviendas/**/*.{png,jpe?g,webp,txt}');

            const imagesByFolderTemp = {};

            await Promise.all(
                Object.keys(context).map(async (key) => {
                    if (key.startsWith(folderPath)) {
                        const module = await context[key]();
                        const filePath = module.default || key;
                        const fileName = key.split('/').pop();
                        const folderName = key.split('/')[key.split('/').length - 2]; // Assuming folder name is at this position
                        if (fileName == 'PORTADA.webp') {
                            setPortadaImage(filePath);
                        } else if (fileName.endsWith('.txt')) {
                            const response = await fetch(filePath);
                            const text = await response.text();
                            setPortadaDescription(text);
                        } else {
                            if (!imagesByFolderTemp[folderName]) {
                                imagesByFolderTemp[folderName] = [];
                            }
                            imagesByFolderTemp[folderName].push(filePath);
                        }
                    }
                })
            );

            setImagesByFolder(imagesByFolderTemp);
        };

        loadImages();
    }, [src]);

    return (
        <div className="viviendas">
            {portadaImage && (
                <div className="portada">
                    <img src={portadaImage} alt="Portada" />
                    {portadaDescription && <p>{portadaDescription}</p>}
                </div>
            )}
            {Object.keys(imagesByFolder).map((folderName) => (
                <div key={folderName} className="concurso">
                    <h3>{folderName}</h3>
                    {imagesByFolder[folderName].map((image, index) => (
                        <img key={index} src={image} alt={`Imagen de ${folderName}`} style={{ paddingBottom: '25px' }} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Viviendas;