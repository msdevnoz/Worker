import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
const authController = new AuthController();
export const authRouter = Router();
authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/users', authController.getUser);
