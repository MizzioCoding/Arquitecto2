import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../src/assets/LOGO Schreiber PNG.png";
import { SlArrowRight } from "react-icons/sl";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null); // Referencia al botón de menú

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleProjects = (event) => {
    event.stopPropagation(); // Detiene la propagación del evento
    setIsProjectsOpen((prevIsProjectsOpen) => !prevIsProjectsOpen);
  };

  const handleClickOutside = (event) => {
    // Si el clic es fuera del menú y fuera del botón de menú, cierra el menú
    if (
      menuRef.current && 
      !menuRef.current.contains(event.target) && 
      buttonRef.current && 
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsProjectsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <img
        src={logo}
        alt="Estudio de arquitectura Schreiber"
        className="logo"
      />
      <div className="navbar-center">
        <button
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          id="menu-toggle"
          onClick={toggleMenu}
          ref={buttonRef} // Añadir referencia al botón de menú
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div
          ref={menuRef}
          className={`linksAlign ${isOpen ? "open" : ""}`}
        >
          <div onClick={toggleProjects} className="projects-dropdown">
            <span className="link">
              <Link className="link" to="/proyectos" onClick={() => setIsOpen(false)}>Proyectos</Link> 
              <SlArrowRight className={`arrow ${isProjectsOpen ? "open" : ""}`} />
            </span>
            {isProjectsOpen && (
              <div className="sub-menu">
                <Link className="sub-link" to="/concursos" onClick={() => setIsOpen(false)}>Concursos</Link>
                <Link className="sub-link" to="/viviendas" onClick={() => setIsOpen(false)}>Viviendas e interiorismo</Link>
                <Link className="sub-link" to="/comercial" onClick={() => setIsOpen(false)}>Comercial</Link>
                <Link className="sub-link" to="/reformas" onClick={() => setIsOpen(false)}>Reformas</Link>
              </div>
            )}
          </div>
          <Link className="link" to="/estudio" onClick={() => setIsOpen(false)}>Estudio</Link>
          <Link className="link" to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
