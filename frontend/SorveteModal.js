import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../services/api';

function SorveteModal({ show, handleClose, carregarSorvetes, editando, setEditando }) {
  const [sabor, setSabor] = useState('');
  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('');
  const [disponivel, setDisponivel] = useState(true);
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (editando) {
      setSabor(editando.sabor);
      setPreco(editando.preco);
      setTipo(editando.tipo);
      setDisponivel(editando.disponivel);
      setDescricao(editando.descricao);
    } else {
      setSabor('');
      setPreco('');
      setTipo('');
      setDisponivel(true);
      setDescricao('');
    }
  }, [editando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoSorvete = { sabor, preco, tipo, disponivel, descricao };

    try {
      if (editando) {
        await api.put(`/sorvetes/${editando.id}`, novoSorvete);
      } else {
        await api.post('/sorvetes', novoSorvete);
      }
      carregarSorvetes();
      handleClose();
      setEditando(null);
    } catch (error) {
      console.error('Erro ao salvar sorvete:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-light-pink">
        <Modal.Title>{editando ? 'Editar Sorvete' : 'Adicionar Sorvete'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="bg-light">
          <Form.Group className="mb-3">
            <Form.Label>Sabor</Form.Label>
            <Form.Control value={sabor} onChange={(e) => setSabor(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preço (R$)</Form.Label>
            <Form.Control type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo</Form.Label>
            <Form.Control value={tipo} onChange={(e) => setTipo(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Disponível"
              checked={disponivel}
              onChange={(e) => setDisponivel(e.target.checked)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-light-pink">
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default SorveteModal;
