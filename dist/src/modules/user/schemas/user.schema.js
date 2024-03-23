var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
            message: (props) => `${props.value} is not a valid username.`,
        },
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value}is not a valid email`
        }
    },
    role: {
        type: String,
        required: true,
        enum: ["employer", "jobSeeker"],
    },
});
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        catch (error) {
            console.log(error.message);
        }
    });
});
