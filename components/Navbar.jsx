import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../src/assets/LOGO Schreiber PNG.png";
import { SlArrowRight } from "react-icons/sl";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
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
    setIsOpen(!isOpen);
  };

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <img
        src={logo}
        alt="Estudio de arquitectura Schreiber"
        className="logo"
      />
      <div className="navbar-center">
        <button className={`menu-toggle ${isOpen ? "open" : ""}`} id="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={`linksAlign ${isOpen ? "open" : ""}`}>
          <div  onMouseEnter={toggleProjects} onMouseLeave={toggleProjects}>
            <Link className="link" to="/proyectos" onClick={() => setIsOpen(false)}>
              <span>Proyectos</span> <SlArrowRight className={`arrow ${isProjectsOpen ? "open" : ""}`} />
            </Link>
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