const db = require('../config/database');

module.exports = {
    async postActivity(req, res){
        try{ 
            const nomeAtividade = await db.Activity.create(req.body);
            res.status(201).json(nomeAtividade);
        } catch(err){
            res.status(500).json({ error: 'Erro ao criar atividade' });
        }
    },

    async getActivity(req, res) {
        try {
            const atividades = await db.Activity.findAll();
            res.status(200).json(atividades);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao listar atividades' });
        }
    },

    async putActivity(req, res) {
        try {
            const [updated] = await db.Activity.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedAtividade = await db.Activity.findByPk(req.params.id);
                res.status(200).json(updatedAtividade);
            } else {
                res.status(404).json({ error: 'Atividade não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar atividade' });
        }
    },

    async deleteActivity(req, res) {
        try {
            const deleted = await db.Activity.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ error: 'Atividade não encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar atividade' });
        }
    }
}