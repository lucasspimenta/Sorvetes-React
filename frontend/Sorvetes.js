import React, { useEffect, useState } from 'react';
import SorveteTabela from '../components/SorveteTabela';
import SorveteModal from '../components/SorveteModal';
import api from '../services/api';

function Sorvetes() {
  const [sorvetes, setSorvetes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);

  const carregarSorvetes = async () => {
    try {
      const resposta = await api.get('/sorvetes');
      setSorvetes(resposta.data);
    } catch (error) {
      console.error('Erro ao carregar sorvetes:', error);
    }
  };

  useEffect(() => {
    carregarSorvetes();
  }, []);

  const abrirModal = () => {
    setEditando(null);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setEditando(null);
    setModalAberto(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🍨 Lista de Sorvetes</h2>
      <button className="btn btn-primary mb-3 px-4" onClick={abrirModal} style={{ fontWeight: 'bold' }}>
   Adicionar Sorvete
</button>


      <SorveteTabela
        sorvetes={sorvetes}
        carregarSorvetes={carregarSorvetes}
        setEditando={setEditando}
        setModalAberto={setModalAberto}
      />

      <SorveteModal
        show={modalAberto}
        handleClose={fecharModal}
        carregarSorvetes={carregarSorvetes}
        editando={editando}
        setEditando={setEditando}
      />
    </div>
  );
}

export default Sorvetes;
