import { Router } from 'express';
import projectController from '../controller/project_controller.js';
const router = Router();


router.get('/:project_id', projectController.getProjectById);
router.post('/create_project/:user_id', projectController.createProject);
router.post('/add_issue/:project_id', projectController.addIssue);


export default router;