import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import api from '../services/api';

function SorveteTabela({ sorvetes, carregarSorvetes, setEditando, setModalAberto }) {
  const excluirSorvete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este sorvete?')) {
      try {
        await api.delete(`/sorvetes/${id}`);
        carregarSorvetes();
      } catch (error) {
        console.error('Erro ao excluir sorvete:', error);
      }
    }
  };

  const editarSorvete = (sorvete) => {
    setEditando(sorvete);
    setModalAberto(true);
  };

  return (
    <div className="table-responsive">
      <Table bordered hover className="align-middle text-center">
        <thead style={{ backgroundColor: '#fcdde2', color: '#cc3366' }}>
          <tr>
            <th>ID</th>
            <th>Sabor</th>
            <th>Preço</th>
            <th>Tipo</th>
            <th>Disponível</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sorvetes.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted py-3">
                Nenhum sorvete cadastrado.
              </td>
            </tr>
          ) : (
            sorvetes.map((sorvete) => (
              <tr key={sorvete.id}>
                <td>{sorvete.id}</td>
                <td>{sorvete.sabor}</td>
                <td>R$ {parseFloat(sorvete.preco).toFixed(2)}</td>
                <td>{sorvete.tipo}</td>
                <td>{sorvete.disponivel ? 'Sim' : 'Não'}</td>
                <td>{sorvete.descricao}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => editarSorvete(sorvete)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => excluirSorvete(sorvete.id)}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default SorveteTabela;
