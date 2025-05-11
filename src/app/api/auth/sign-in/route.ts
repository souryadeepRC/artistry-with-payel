import bcrypt from "bcryptjs";
import apiResponse from "lib/APIResponse";
import dbConnect from "lib/dbConnect";
import UserModel from "model/User";
import UserSessionModel from "model/UserSession";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";
import { createUserSession } from "../session";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  await dbConnect();
  try {
    const { email, password } = await request.json();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return apiResponse.badRequest({
        message: "User not found with email " + email,
      });
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    console.log({ isSamePassword });

    if (!isSamePassword) {
      return apiResponse.badRequest({ message: "password is wrong" });
    }
    await createUserSession(user._id as ObjectId, await cookies());
    return apiResponse.create({ message: "User logged in" });
  } catch (error) {
    return apiResponse.serverError({
      message: "Failed to Login user",
      ...(error instanceof Error ? { error: error.message } : {}),
    });
  }
};
