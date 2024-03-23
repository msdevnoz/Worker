var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fileUploadMiddleware, getFileUploadPath } from '../../../utils/file.upload.js';
import { EmployerModel } from '../models/employer.model.js';
import { mongo } from 'mongoose';
import { JobModel } from '../../job/models/job.model.js';
export class EmployerController {
    createEmployer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, profession, about, programmingLanguages, country, experience, languages, certificates, ratings, photo } = req.body;
                fileUploadMiddleware(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        res.status(400).json({ msg: 'Error uploading file', data: null, error: true });
                        return;
                    }
                    if (!req.file) {
                        res.status(400).json({ error: 'No file uploaded', data: null, err: true });
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
                        photo: photoPath
                    });
                    const savedEmployer = yield newEmployer.save();
                    res.status(201).json({ msg: 'CreatEmployer', data: savedEmployer, err: false });
                }));
            }
            catch (err) {
                if (err instanceof mongo.MongoServerError) {
                    res.status(409).json({ msg: err.message, data: null, error: true });
                    return;
                }
                res.status(500).json({ msg: err.message, data: null, error: true });
            }
        });
    }
    ;
    getEmployers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10 } = req.query;
                const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
                const sort = [['ratings.averageRating', 'desc']];
                const employers = yield EmployerModel.find({})
                    .sort(sort)
                    .skip(skip)
                    .limit(parseInt(limit, 10))
                    .populate('ratings', 'averageRating');
                const employersWithAverageRating = employers.map((employer) => (Object.assign(Object.assign({}, employer.toObject()), { averageRating: employer.ratings.reduce((acc, rating) => acc + rating, 0) / employer.ratings.length })));
                res.status(200).json({ msg: 'Successful', data: employersWithAverageRating, error: false });
            }
            catch (error) {
                console.error('Error fetching employers:', error);
                res.status(500).json({ msg: 'Internal Server Error', data: null, error: true });
            }
        });
    }
    ;
    getEmployerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employerId = req.params.id;
                const employer = yield EmployerModel.findById(employerId);
                if (!employer) {
                    res.status(404).json({ msg: 'Employer not found', data: null, error: true });
                    return;
                }
                res.status(200).json({ msg: 'Successfully', data: employer, error: true });
            }
            catch (err) {
                if (err instanceof mongo.MongoServerError) {
                    res.status(409).json({ msg: err.message, data: null, error: true });
                    return;
                }
                res.status(500).json({ msg: err.message, data: null, error: true });
            }
        });
    }
    ;
    getEmployerJobPostings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10 } = req.query;
                const employerId = req.params.id;
                const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
                const jobPostings = yield JobModel.find({ employer: employerId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(parseInt(limit, 10));
                res.status(200).json(jobPostings);
            }
            catch (err) {
                if (err instanceof mongo.MongoServerError) {
                    res.status(409).json({ msg: err.message, data: null, error: true });
                    return;
                }
                res.status(500).json({ msg: err.message, data: null, error: true });
            }
        });
    }
}
