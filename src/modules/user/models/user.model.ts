import { model } from "mongoose";
import { IUser, userSchema } from "../schemas/user.schema.js";

export const UserModel=model<IUser>('user',userSchema)