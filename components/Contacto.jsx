import React, { useState } from 'react';
import '../src/index.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío del formulario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true); // Establecer el estado de envío a true

    setTimeout(() => {
      setIsSubmitting(false); // Establecer el estado de envío a false después de enviar
      // Limpiar el formulario después del envío
      setFormData({
        nombre: '',
        email: '',
        mensaje: ''
      });
    }, 10000); // Simular un retraso de 10 segundos
  };

  return (
    <div className="contact-form">
      <h2>Contacto</h2>
      <form action="https://formsubmit.co/aguschizzini@gmail.com" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="_subject" value="Nueva consulta!"></input>
        <input type="hidden" name="_captcha" value="false"></input>
        <input type="hidden" name="_template" value="table"></input>
        <input type="hidden" name="_next" value="http://localhost:5173/thanks"></input>
        <input type="text" name="_honey" style={{display:'none'}}></input>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner"></span> : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default Contacto;