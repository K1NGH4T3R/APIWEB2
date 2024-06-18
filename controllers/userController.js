const { User } = require('../models');

module.exports = {
  async postUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }0
  },
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },
  async getUsersByUsername(req, res) {
    try {
      const user = await User.findOne({ where: { username: req.params.username } });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao obter usuário' });
    }
  },
  async putUser(req, res) {
    try {
      const [updated] = await User.update(req.body, {
        where: { username: req.params.username }
      });
      if (updated) {
        const updatedUser = await User.findOne({ where: { username: req.params.username } });
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },
  async deleteUser(req, res) {
    try {
      const deleted = await User.destroy({
        where: { username: req.params.username }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
};