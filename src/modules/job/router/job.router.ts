import { Router } from 'express';
import { JobController } from '../controller/job.controller.js';
import { jobMiddleware } from '../middleware/job.middleware.js';


const jobRouter = Router();
const jobController = new JobController();
jobRouter.use(jobMiddleware)
jobRouter.get('/search-jobs', jobController.searchJobs);
jobRouter.get('/top-rated-employers',jobController.getTopRatedEmployers);
jobRouter.post('/rate-employer',jobController.rateEmployer);
export default jobRouter;
