import { model } from "mongoose";
import { jobSchema } from "./job.schema.js";
export const JobModel = model('Employer', jobSchema);
