import dbConnect from "lib/dbConnect";
import UserModel from "model/User";
import * as jwt from "jsonwebtoken";
import UserSessionModel, { UserSession } from "model/UserSession";
import mongoose, { ObjectId } from "mongoose";
import { cookies } from "next/headers";
const TOKEN_KEY = "asfasfasewwe324wefwe";
const generateToken = (tokenData: any) => {
  return jwt.sign(tokenData, TOKEN_KEY, {
    expiresIn: "1h",
  });
};
const addSessionInDb = async (userId: ObjectId): Promise<string> => {
  const userSession = await UserSessionModel.findOne({ userId });
  console.log({ userSession });
  const authToken = generateToken({
    id: userId,
    role: "user",
  });
  if (!userSession) {
    const newUserSession = new UserSessionModel({
      userId,
      authToken,
    });
    console.log({ newUserSession });
    await newUserSession.save();
  } else {
    const response = await UserSessionModel.findOneAndUpdate(
      { userId },
      {
        authToken,
      }
    );
    console.log({ response });
  }
  return authToken;
};
const getUserFromDb = async (sessionId: string) => {
  await dbConnect();
  try {
    const dbId = new mongoose.Types.ObjectId(sessionId);
    const userSession = await UserSessionModel.findById(dbId);
    if (userSession) {
      const user = await UserModel.findById(userSession.userId);
      if (user) {
        return user;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
const COOKIE_KEY = "AUTH_SESSION_COOKIE";
const SESSION_EXPIRATION_SECOND = 60 * 60 * 24 * 7;
const setCookie = (authToken: string, cookies: any) => {
  cookies.set(COOKIE_KEY, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECOND * 1000,
  });
};
const createUserSession = async (userId: ObjectId, cookies: any) => {
  const authToken = await addSessionInDb(userId);
  setCookie(authToken, cookies);
};
const getUserFromSession = async (cookies: any) => {
  const userSession = cookies.get(COOKIE_KEY)?.value;
  console.log("getUserFromSession", { userSession });
  const user = await getUserFromDb(userSession);
  console.log(user);

  return user;
};

export { createUserSession, getUserFromSession };
