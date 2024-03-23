import { Schema} from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    username: string;
    password: string;
    email: string;
    role: "employer" | "jobSeeker";
}

export const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            validate: {
                validator: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
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
           validate:{
                validator:function(v:string){
               return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)},
               message:props=>`${props.value}is not a valid email`
              }
        },
        role: {
            type: String,
            required: true,
            enum: ["employer", "jobSeeker"],
        },
    }
);


userSchema.pre("save", async function () {
    try {
     const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error:any) {
      console.log(error.message); 
    }
  });