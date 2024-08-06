import express from 'express';
import verifyUserAuth from '../utils/middleware/authMiddleware';
import { createProject , fetchProjects , fetchProject, editProject } from  '../controller/projectController'

const router = express.Router();

router.post('/projects',verifyUserAuth, createProject );
router.get('/projects',verifyUserAuth, fetchProjects );
router.get('/project/:id',verifyUserAuth, fetchProject );
router.put('/projects/:id',verifyUserAuth, editProject );


export default router;