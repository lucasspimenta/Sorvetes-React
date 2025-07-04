import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sorvetes from './pages/Sorvetes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorvetes" element={<Sorvetes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
