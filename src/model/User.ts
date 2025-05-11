import mongoose, { Document, Schema } from "mongoose";
interface User extends Document {
  name: string;
  email: string;
  image: string;
  password: string;
  role: "user" | "admin";
}
const UserSchema: Schema<User> = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email address is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
