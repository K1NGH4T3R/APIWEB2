const express = require('express');
const activityController = require('../controllers/activityController');
const artifactController = require('../controllers/artifactController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authToken = require('../middleware/auth');

const router = express.Router();

/* ROTAS AUTENTICAÇÃO */
router.post('/login', authController.login);
router.post('/logout', authController.logout);

/* ROTAS ATIVIDADE */
router.get('/activity', authToken, activityController.getActivity);
router.get('/activity/:id', authToken, activityController.getActivityById);
router.get('/user/:username/activity', authToken, activityController.getActivityByUser);
router.post('/activity', authToken, activityController.postActivity);
router.put('/activity/:id', authToken, activityController.putActivity);
router.delete('/activity/:id', authToken, activityController.deleteActivity);

/* ROTAS ARTEFATOS */
router.get('/activity/:id/artifact', authToken, artifactController.getArtifactByActivity);
router.get('/activity/:id/artifact/:artifactId', authToken, artifactController.getArtifactById);
router.delete('/activity/:id/artifact/:artifactId', authToken, artifactController.deleteArtifact);
router.post('/activity/:id/artifact', authToken, artifactController.postArtifact);
router.put('/activity/:id/artifact/:artifactId', authToken, artifactController.putArtifact);

/* ROTAS USUARIO */
router.get('/user', authToken, userController.getUsers);
router.get('/user/:username', authToken, userController.getUsersByUsername);
router.post('/user', userController.postUser);
router.put('/user/:username', authToken, userController.putUser);
router.delete('/user/:username', authToken, userController.deleteUser);

module.exports = router;