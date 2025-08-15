import express from 'express';

const router = express.Router();
import { registerUser, loginUser } from '../Controllers/AuthController.js';


// Route pour l'enregistrement
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', loginUser);

export default router;