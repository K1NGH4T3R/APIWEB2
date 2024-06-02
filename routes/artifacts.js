const express = require('express');
const { Artifact, Activity } = require('../models');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/activities/:id/artifacts', auth(), async (req, res) => {
  try {
    const { name } = req.body;
    const activity = await Activity.findByPk(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const artifact = await Artifact.create({ name, activity_id: activity.id });
    res.status(201).json({ message: 'Artifact added successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error adding artifact' });
  }
});

module.exports = router;