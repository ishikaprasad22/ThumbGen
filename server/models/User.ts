import mongoose from "mongoose";

export interface IUser extends Document{
  name: string;
  email: string;
  password?: string;
  generationLockUntil?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: { type: String, required: true },
  generationLockUntil: { type: Date, default: null }
}, { timestamps: true })
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
