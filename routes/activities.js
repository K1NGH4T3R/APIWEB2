const express = require('express');
const { Activity, User } = require('../models');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/activities', auth(), async (req, res) => {
  try {
    const { name } = req.body;
    const activity = await Activity.create({ name });
    res.status(201).json({ message: 'Activity created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity' });
  }
});

router.put('/activities/:id/assign', auth('admin'), async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const activity = await Activity.findByPk(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    activity.assigned_to = user.id;
    await activity.save();
    res.json({ message: 'Activity assigned successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error assigning activity' });
  }
});

module.exports = router;
