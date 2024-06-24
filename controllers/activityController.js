const { Activity } = require('../models');

module.exports = {
    async postActivity(req, res){
        try{ 
            console.log(req.body)
            const Atividade = await Activity.create(req.body);
            res.status(201).json(Atividade);
        } catch(err){
            console.log(err)
            res.status(500).json({ error: 'Erro ao criar atividade' });
        }
    },

    async getActivity(req, res) {
        try {
            const Atividades = await Activity.findAll();
            res.status(200).json(Atividades);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao listar atividades' });
        }
    },

    async getActivityById (req, res) {
        try{
            const Atividade = await Activity.findByPk(req.params.id);

            res.status(200).json(Atividade);
        } catch(err){
            console.error(err);
            res.status(500).json({error: 'erro ao obter atividade'});
        }
    },

    async getActivityByUser (req, res) {
        try{
            const Atividade = await Activity.findAll({where: {assigned_to: req.params.id}});
            res.status(200).json(Atividade);
        } catch (err){
            console.error(err);
            res.status(500).json({error: 'atividade não encontrada'});
        }
    },

    async putActivity(req, res) {
        try {
            const [updated] = await Activity.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedAtividade = await Activity.findByPk(req.params.id);
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
            const deleted = await Activity.destroy({
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