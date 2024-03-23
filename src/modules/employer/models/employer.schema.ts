import { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IEmployer extends Document {
  username: string;
  profession: string;
  about: string;
  programmingLanguages: string[];
  country: string;
  experience: number;
  languages: string[];
  certificates: string[];
  ratings: number[];
  photo: string;
  averageRating: number;
  jobs: Schema.Types.ObjectId[];
}

function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / ratings.length;
}

export const employerSchema = new Schema<IEmployer>({
  username: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  programmingLanguages: {
    type: [String],
    default: [],
  },
  country: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  languages: {
    type: [String],
    default: [],
  },
  certificates: {
    type: [String],
    default: [],
  },
  ratings: {
    type: [Number],
    default: [],
  },
  photo: {
    type: String,
    required: true,
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
});

employerSchema.plugin(mongoosePaginate);

employerSchema.virtual('averageRating').get(function (this: IEmployer) {
  return calculateAverageRating(this.ratings);
});

 employerSchema.statics.getEmployersByHighestRating = async function (): Promise<IEmployer[]> {
  try {
    const employers = await this.find().sort({ 'averageRating': -1 });
    return employers;
  } catch (error) {
    throw new Error('Error fetching employers by highest rating');
  }
};

employerSchema.pre('save', function (this: IEmployer, next) {
  this.averageRating = calculateAverageRating(this.ratings);
  next();
});

employerSchema.set('toJSON', { virtuals: true });
