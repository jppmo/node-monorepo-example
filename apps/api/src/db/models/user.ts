import mongoose from "mongoose";
import { User } from "../../helpers/interfaces";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true }, // required: true
  authentication: {
    password: { type: String, required: false, select: false},
    sessionToken: { type: String, select: false},
    token: { type: String, select: false },
    isOTP: { type: Boolean, select: false, default: false },
  }
})

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const createUser = (values: User) => new UserModel(values).save().then(
  (user) => user.toObject() as User
);