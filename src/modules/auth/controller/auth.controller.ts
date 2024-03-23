import { Request, Response } from "express";
import { UserModel } from "../../user/models/user.model.js"
import { jwtHelper } from "../../../utils/jwt.js";
import { mongo } from "mongoose";
import bcrypt from "bcrypt";

export class AuthController {
 
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ msg: 'Email and password are required', data: null, error: true });
        return;
      }

      const user = await UserModel.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(404).json({ msg: 'Invalid credentials', data: null, error: true });
        return;
      }

      const TOKEN = jwtHelper.sign({ email: user.email, role: user.role });
      res.status(200).json({ msg: 'OK', data: TOKEN, error: false });
    } catch (err: any) {
      if (err instanceof mongo.MongoServerError) {
        res.status(409).json({ msg: err.message, data: null, error: true });
        return;
      }
      res.status(500).json({ msg: err.message, data: null, error: true });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email, role } = req.body;
      if (!username || !password || !email || !role) {
        res.status(400).json({ msg: 'All fields are required', data: null, error: true });
        return;
      }
      const user = await UserModel.create({
        username,
        password,
        email,
        role,
      })
       
      const TOKEN = jwtHelper.sign({ email: user.email, role: user.role });
      await user.save();
      res.status(201).json({ msg: 'CREATED', data: TOKEN, error: false });
    } catch (err: any) {
      if (err instanceof mongo.MongoServerError) {
        res.status(409).json({ msg: err.message, data: null, error: true });
        return;
      }
      res.status(500).json({ msg: err.message, data: null, error: true });
    }
  }
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserModel.find();
      res.status(200).json({ msg: 'OK', data: user, error: false });
    } catch (err: any) {
      if (err instanceof mongo.MongoServerError) {
        res.status(409).json({ msg: err.message, data: null, error: true });
        return;
      }
      res.status(500).json({ msg: err.message, data: null, error: true });
    }
  }
}

