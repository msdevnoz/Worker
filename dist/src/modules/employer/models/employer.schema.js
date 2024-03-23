var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
function calculateAverageRating(ratings) {
    if (ratings.length === 0) {
        return 0;
    }
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
}
export const employerSchema = new Schema({
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
employerSchema.virtual('averageRating').get(function () {
    return calculateAverageRating(this.ratings);
});
employerSchema.statics.getEmployersByHighestRating = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employers = yield this.find().sort({ 'averageRating': -1 });
            return employers;
        }
        catch (error) {
            throw new Error('Error fetching employers by highest rating');
        }
    });
};
employerSchema.pre('save', function (next) {
    this.averageRating = calculateAverageRating(this.ratings);
    next();
});
employerSchema.set('toJSON', { virtuals: true });
