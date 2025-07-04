import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>🍦 Bem-vindo ao Sistema de Sorvetes</h1>
        <p>Gerencie sabores, preços, tipos e disponibilidade de forma simples e rápida.</p>
        <button className="btn btn-primary" onClick={() => navigate('/sorvetes')}>
          Acessar Sorvetes
        </button>
      </div>
    </div>
  );
}

export default Home;
