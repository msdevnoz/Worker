var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "./utils/db.connection.js";
import "dotenv/config";
import express from "express";
import { authRouter } from './modules/auth/router/auth.router.js';
import controllerRouter from "./modules/employer/router/employer.router.js";
import jobRouter from "./modules/job/router/job.router.js";
function starter() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = express();
            app.use(express.json());
            app.listen(process.env.APP_PORT, () => {
                console.log('Server is running on port:' + process.env.APP_PORT);
            });
            //Router 
            app.use(authRouter);
            app.use(controllerRouter);
            app.use(jobRouter);
        }
        catch (error) {
            console.error(error);
            process.exit(-1);
        }
    });
}
starter();
