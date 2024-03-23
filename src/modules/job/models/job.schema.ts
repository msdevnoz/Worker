import { Schema, Document } from 'mongoose';
import { IEmployer } from '../../employer/models/employer.schema.js';
import mongoosePaginate from 'mongoose-paginate-v2';
export interface IJob extends Document {
  title: string;
  description: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  employer: Schema.Types.ObjectId | IEmployer;
}

export const jobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'Employer', 
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

jobSchema.plugin(mongoosePaginate);