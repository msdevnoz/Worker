import "./utils/db.connection.js"
import "dotenv/config"
import express, { Application } from "express"
import { authRouter } from './modules/auth/router/auth.router.js'
import controllerRouter from "./modules/employer/router/employer.router.js"
import jobRouter from "./modules/job/router/job.router.js"
declare global{
    namespace Express{
        interface Request{
            user:object
        }
    }
}
async function starter():Promise<void>{
    try {
       const app:Application=express() 
       app.use(express.json())
       app.listen(process.env.APP_PORT,()=>{
        console.log('Server is running on port:'+process.env.APP_PORT);
       })
       //Router 
       app.use(authRouter);
       app.use(controllerRouter);
       app.use(jobRouter);
    } catch (error:any) {
        console.error(error)
        process.exit(-1)
    }
}
starter()