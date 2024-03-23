import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
export const jobSchema = new Schema({
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
