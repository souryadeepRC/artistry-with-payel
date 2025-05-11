import mongoose, { Document, Schema } from "mongoose";
export interface UserSession extends Document {
  userId: string;
  authToken: string;
}
const UserSessionSchema: Schema<UserSession> = new Schema({
  userId: {
    type: String,
  },
  authToken: {
    type: String,
  },
});

const UserSessionModel =
  (mongoose.models.UserSession as mongoose.Model<UserSession>) ||
  mongoose.model<UserSession>("UserSession", UserSessionSchema);

export default UserSessionModel;
