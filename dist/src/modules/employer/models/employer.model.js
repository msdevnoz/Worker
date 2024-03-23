import { model } from "mongoose";
import { employerSchema } from "./employer.schema.js";
export const EmployerModel = model('Employer', employerSchema);
