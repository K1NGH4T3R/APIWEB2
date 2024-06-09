const db = require('../config/database');

module.exports = {
    async postArtifact(req, res){
        try{ 
            const nomeArtefato = await db.Artifact.create(req.body);
            res.status(201).json(nomeArtefato);
        } catch(err){
            res.status(500).json({ error: 'Erro ao criar artefato' });
        }
    },

    async getArtifact(req, res) {
        try {
            const Artefato = await db.Artifact.findAll();
            res.status(200).json(Artefato);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao listar artefato' });
        }
    },

    async putArtifact(req, res) {
        try {
            const [updated] = await db.Artifact.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedArtefato = await db.Artifact.findByPk(req.params.id);
                res.status(200).json(updatedArtefato);
            } else {
                res.status(404).json({ error: 'Artefato não encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar artefato' });
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
                res.status(404).json({ error: 'Artefato não encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar Artefato' });
        }
    }
}