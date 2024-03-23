import { Request, Response } from 'express';
import { fileUploadMiddleware, getFileUploadPath } from '../../../utils/file.upload.js';
import { EmployerModel } from '../models/employer.model.js';
import { mongo } from 'mongoose';
import { IEmployer } from '../models/employer.schema.js';
import { JobModel } from '../../job/models/job.model.js';
export class EmployerController{
    async createEmployer (req: Request, res: Response): Promise<void>{
        try {
          const { username,profession,about,programmingLanguages,country,experience,languages,certificates,ratings,photo } = req.body;
          fileUploadMiddleware(req, res, async (err) => {
            if (err) {
              res.status(400).json({ msg: 'Error uploading file',data: null, error: true });
              return;
            }
            if (!req.file) {
              res.status(400).json({ error: 'No file uploaded',data:null,err:true });
              return;
            }
      
            const photoPath = getFileUploadPath(req.file.filename);
      
            const newEmployer = new EmployerModel({
              username,
        profession,
        about,
        programmingLanguages,
        country,
        experience,
        languages,
        certificates,
        ratings,
        photo:photoPath
            });
      
            const savedEmployer = await newEmployer.save();
      
            res.status(201).json({msg:'CreatEmployer',data:savedEmployer,err:false});
          });
        } catch (err:any) {
          if (err instanceof mongo.MongoServerError) {
              res.status(409).json({ msg: err.message, data: null, error: true });
              return;
            }
            res.status(500).json({ msg: err.message, data: null, error: true });
        }
      };
    async getEmployers (req: Request, res: Response): Promise<void>{
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
            
            const sort: [string, 'asc' | 'desc'][] = [['ratings.averageRating', 'desc']];
        
            const employers = await EmployerModel.find({})
              .sort(sort)
              .skip(skip)
              .limit(parseInt(limit as string, 10))
              .populate('ratings', 'averageRating');
        
            const employersWithAverageRating = employers.map((employer: IEmployer) => ({
              ...employer.toObject(),
              averageRating: employer.ratings.reduce((acc:any, rating:any) => acc + rating, 0) / employer.ratings.length,
            }));
        
            res.status(200).json({ msg: 'Successful', data: employersWithAverageRating, error: false });
          } 
      catch (error) {
          console.error('Error fetching employers:', error);
          res.status(500).json({ msg: 'Internal Server Error' ,data:null,error:true});
        }
      };
      
      async getEmployerById(req: Request, res: Response): Promise<void>{
        try {
          const employerId = req.params.id;
          const employer = await EmployerModel.findById(employerId);
          if (!employer) {
            res.status(404).json({ msg: 'Employer not found',data:null,error:true});
            return;
          }
      
          res.status(200).json({msg:'Successfully',data:employer,error:true});
        } 
        catch (err:any) {
            if (err instanceof mongo.MongoServerError) {
                res.status(409).json({ msg: err.message, data: null, error: true });
                return;
              }
              res.status(500).json({ msg: err.message, data: null, error: true });
          }
      };
      
      async getEmployerJobPostings(req: Request, res: Response): Promise<void>{
        try {
            const { page = 1, limit = 10 } = req.query;
            const employerId = req.params.id;
      
            const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
      
            const jobPostings = await JobModel.find({ employer: employerId })
              .sort({ createdAt: -1 })
              .skip(skip)
              .limit(parseInt(limit as string, 10));
              
      
          res.status(200).json(jobPostings);
        }  catch (err:any) {
            if (err instanceof mongo.MongoServerError) {
                res.status(409).json({ msg: err.message, data: null, error: true });
                return;
              }
              res.status(500).json({ msg: err.message, data: null, error: true });
          }
}
}