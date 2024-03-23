var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from "../../user/models/user.model.js";
import { jwtHelper } from "../../../utils/jwt.js";
import { mongo } from "mongoose";
import bcrypt from "bcrypt";
export class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ msg: 'Email and password are required', data: null, error: true });
                    return;
                }
                const user = yield UserModel.findOne({ email });
                if (!user || !(yield bcrypt.compare(password, user.password))) {
                    res.status(404).json({ msg: 'Invalid credentials', data: null, error: true });
                    return;
                }
                const TOKEN = jwtHelper.sign({ email: user.email, role: user.role });
                res.status(200).json({ msg: 'OK', data: TOKEN, error: false });
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
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email, role } = req.body;
                if (!username || !password || !email || !role) {
                    res.status(400).json({ msg: 'All fields are required', data: null, error: true });
                    return;
                }
                const user = yield UserModel.create({
                    username,
                    password,
                    email,
                    role,
                });
                const TOKEN = jwtHelper.sign({ email: user.email, role: user.role });
                yield user.save();
                res.status(201).json({ msg: 'CREATED', data: TOKEN, error: false });
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
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel.find();
                res.status(200).json({ msg: 'OK', data: user, error: false });
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
