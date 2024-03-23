import { Request, Response } from 'express';
import { JobModel } from '../models/job.model.js';
import { EmployerModel } from '../../employer/models/employer.model.js';
import { mongo } from 'mongoose';

export class JobController {
  async searchJobs(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, category } = req.query;
      const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

      const query: any = { isActive: true };

      if (category) {
        query.category = category;
      }

      const jobs = await JobModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string, 10));

      res.status(200).json({ msg: 'Successful', data: jobs, error: false });
    } catch (err: any) {
      if (err instanceof mongo.MongoServerError) {
        res.status(409).json({ msg: err.message, data: null, error: true });
      } else {
        res.status(500).json({ msg: err.message, data: null, error: true });
      }
    }
  }

  async getTopRatedEmployers(req: Request, res: Response): Promise<void> {
    try {
      const topRatedEmployers = await EmployerModel.find()
        .sort({ 'averageRating': -1 })
        .limit(10); // Adjust the limit as needed

      res.status(200).json({ msg: 'Successful', data: topRatedEmployers, error: false });
    } catch (err: any) {
      if (err instanceof mongo.MongoServerError) {
        res.status(409).json({ msg: err.message, data: null, error: true });
      } else {
        res.status(500).json({ msg: err.message, data: null, error: true });
      }
    }
  }
  async rateEmployer(req: Request, res: Response): Promise<void> {
    try {
      const { employerId, rating } = req.body;
      const employer = await EmployerModel.findById(employerId);

      if (!employer) {
        res.status(404).json({ msg: 'Employer not found', data: null, error: true });
        return;
      }
      employer.ratings.push(rating);
      await employer.save();

      res.status(200).json({ msg: 'Rating successful', data: null, error: false });
    } catch (err: any) {
      if (err instanceof mongo.MongoServerError) {
        res.status(409).json({ msg: err.message, data: null, error: true });
      } else {
        res.status(500).json({ msg: err.message, data: null, error: true });
      }
    }
  }
}
