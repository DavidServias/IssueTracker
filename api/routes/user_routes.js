import { Router } from 'express';
import userController from '../controller/user_controller.js';
const router = Router();


router.post('/login', userController.getUserByCredentials);
router.get('/:userId', userController.getUserById);
router.post('/create_user', userController.createUser); //create user


export default router;