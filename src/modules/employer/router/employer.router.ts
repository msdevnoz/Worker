import express from 'express';
import { EmployerController } from '../controllers/employer.controller.js';
import { employerMiddleware } from '../middleware/employer.middleware.js';
const controllerRouter = express.Router();
controllerRouter.use(employerMiddleware);
const employerController = new EmployerController();
controllerRouter.post('/create', employerController.createEmployer);
controllerRouter.get('/get', employerController.getEmployers);
controllerRouter.get('/:id', employerController.getEmployerById);
controllerRouter.get('/:id/job-postings', employerController.getEmployerJobPostings);

export default controllerRouter;
