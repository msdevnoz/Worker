var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JobModel } from '../models/job.model.js';
import { EmployerModel } from '../../employer/models/employer.model.js';
import { mongo } from 'mongoose';
export class JobController {
    searchJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10, category } = req.query;
                const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
                const query = { isActive: true };
                if (category) {
                    query.category = category;
                }
                const jobs = yield JobModel.find(query)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(parseInt(limit, 10));
                res.status(200).json({ msg: 'Successful', data: jobs, error: false });
            }
            catch (err) {
                if (err instanceof mongo.MongoServerError) {
                    res.status(409).json({ msg: err.message, data: null, error: true });
                }
                else {
                    res.status(500).json({ msg: err.message, data: null, error: true });
                }
            }
        });
    }
    getTopRatedEmployers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topRatedEmployers = yield EmployerModel.find()
                    .sort({ 'averageRating': -1 })
                    .limit(10); // Adjust the limit as needed
                res.status(200).json({ msg: 'Successful', data: topRatedEmployers, error: false });
            }
            catch (err) {
                if (err instanceof mongo.MongoServerError) {
                    res.status(409).json({ msg: err.message, data: null, error: true });
                }
                else {
                    res.status(500).json({ msg: err.message, data: null, error: true });
                }
            }
        });
    }
    rateEmployer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { employerId, rating } = req.body;
                const employer = yield EmployerModel.findById(employerId);
                if (!employer) {
                    res.status(404).json({ msg: 'Employer not found', data: null, error: true });
                    return;
                }
                employer.ratings.push(rating);
                yield employer.save();
                res.status(200).json({ msg: 'Rating successful', data: null, error: false });
            }
            catch (err) {
                if (err instanceof mongo.MongoServerError) {
                    res.status(409).json({ msg: err.message, data: null, error: true });
                }
                else {
                    res.status(500).json({ msg: err.message, data: null, error: true });
                }
            }
        });
    }
}
