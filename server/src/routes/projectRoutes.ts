import express from 'express';
import verifyUserAuth from '../utils/middleware/authMiddleware';
import { createProject , fetchProjects , fetchProject, editProject ,deleteProject , fetchTodos , addTodo , updateTodo , deleteTodo , exportGist } from  '../controller/projectController'

const router = express.Router();

router.post('/projects',verifyUserAuth, createProject );
router.get('/projects',verifyUserAuth, fetchProjects );
router.get('/project/:id',verifyUserAuth, fetchProject );
router.put('/projects/:id',verifyUserAuth, editProject );
router.delete('/projects/:id',verifyUserAuth, deleteProject );

//todo related routes
router.get('/project/:projectId/todos',verifyUserAuth,fetchTodos)
router.post('/project/:projectId/todos',verifyUserAuth,addTodo)
router.put('/project/:projectId/todos/:todoId',verifyUserAuth,updateTodo)
router.delete('/project/:projectId/todos/:todoId',verifyUserAuth,deleteTodo)
router.post('/export-gist/:projectId',verifyUserAuth,exportGist)


export default router;