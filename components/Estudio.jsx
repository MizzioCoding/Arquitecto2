import React from 'react';
import '../src/index.css';
import logo from '../src/assets/LOGO Schreiber PNG.png';
import ezequiel from '../src/assets/ezequiel.jpg';

const Estudio = () => {
    return (
        <div className="estudio-container">
            <div className="estudio-align">
                <div className="estudio-texto">
                    <h2 className="estudio-titulo">EL ESTUDIO</h2>
                    <p className="estudio-descripcion">
                        Estudio de arquitectura dedicado al diseño, gestión y construcción de proyectos de arquitectura.
                    </p>
                    <p className="estudio-descripcion">
                        Nos representa un compromiso en el abordaje de soluciones integrales y de calidad con un enfoque a la
                        sostenibilidad de ambiental y un claro proceso de obra que gestione recursos de manera eficiente.
                    </p>
                    <p className="estudio-descripcion">
                        Nos interesa una evolución de diseño en conjunto con el cliente resolviendo intenciones de proyecto,
                        estándares de calidades e imágenes finales del proyecto.
                    </p>
                </div>
                <div className='logoSchreiber'>
                    <img src={logo} alt="Logo Schreiber" />
                </div>
            </div>
            <div className="estudio-align">
                <div className="estudio-texto">
                    <h2 className="estudio-subtitulo">ARQUITECTO A CARGO</h2>
                    <h3 className="estudio-arquitecto">Arq. Ezequiel Agustín Schreiber</h3>
                    <p className="estudio-descripcion">
                        Arquitecto recibido en la Facultad de Arquitectura, Diseño y Urbanismo - FADU, dedicado y apasionado por
                        crear diseños innovadores y ofrecer resultados excepcionales.
                    </p>
                    <p className="estudio-descripcion">
                        Comienza su práctica independientemente con un claro enfoque en desarrollo de mobiliario, remodelación y
                        reciclaje de viviendas. Ha completado con éxito numerosos proyectos de oficinas y espacios residenciales,
                        así como el diseño de viviendas unifamiliares y espacios comerciales.
                    </p>
                    <p className="estudio-descripcion">
                        Ha participado en diversos concursos de arquitectura y urbanismo, habiendo logrado obtener diversos premios
                        tanto en proyectos grupales como individuales. También ha realizado varios estudios de posgrado relacionados
                        con la actividad proyectual e inversión inmobiliaria.
                    </p>
                    <p className="estudio-descripcion">
                        En adición de la búsqueda arquitectónica y un compromiso con la comunidad, ha colaborado y formado parte de
                        diferentes grupos y colectivos de artistas visuales, pintores y diseñadores gráficos.
                    </p>
                </div>
                <img className='logoEzequiel' src={ezequiel} alt="Ezequiel Schreiber" />
            </div>
        </div>
    );
};

export default Estudio;
