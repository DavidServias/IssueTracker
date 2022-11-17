import { Router } from 'express';
import projectController from '../controller/project_controller.js';
const router = Router();


router.get('/:project_id', projectController.getProjectById);
router.post('/create_project/:user_id', projectController.createProject);


export default router;