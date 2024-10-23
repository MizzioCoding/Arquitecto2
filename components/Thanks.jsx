import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';

const Thanks = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', marginTop:"100px" }}>
            <div style={{ textAlign: 'center' }}>
                <BiCheckCircle style={{ color: '#00d000', fontSize: 100 }} />
                <h1 style={{marginBottom:20}}>¡Consulta enviada!</h1>
                <p>Nos pondremos en contacto contigo pronto.</p>
            </div>
        </div>
    );
};

export default Thanks;