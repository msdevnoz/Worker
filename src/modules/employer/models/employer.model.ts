import { model } from "mongoose";

import { IEmployer, employerSchema } from "./employer.schema.js";

export const EmployerModel = model<IEmployer>('Employer', employerSchema);
