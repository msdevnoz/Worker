import { model } from "mongoose";
import { IJob, jobSchema } from "./job.schema.js";



export const JobModel = model<IJob>('Employer', jobSchema);
