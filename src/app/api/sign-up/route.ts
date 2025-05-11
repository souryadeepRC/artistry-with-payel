import bcrypt from "bcryptjs";
import apiResponse from "lib/APIResponse";
import dbConnect from "lib/dbConnect";
import UserModel from "model/User";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  await dbConnect();
  try {
    const { name, email, password } = await request.json();

    const user = await UserModel.findOne({ email });
    if (user) {
      return apiResponse.badRequest({
        message: "User already exist with email " + email,
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const createdUser = new UserModel({
      name,
      email,
      password: encryptedPassword,
    });
    const response = await createdUser.save();
    return apiResponse.create({ message: "OK", response });
  } catch (error) {
    return apiResponse.serverError({
      message: "Failed to create user",
      ...(error instanceof Error ? { error: error.message } : {}),
    });
  }
};
export const PATCH = async (request: NextRequest, response: any) => {
  await dbConnect();
  try {
    const { name, email, password } = await request.json();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return apiResponse.badRequest({
        message: "User not found with email " + email,
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: { name, password: encryptedPassword },
      }
    );

    return apiResponse.ok({
      message: `User with email ${email} updated successfully`,
    });
  } catch (error) {
    return apiResponse.serverError({ message: "Failed to update user" });
  }
};
export const DELETE = async (request: NextRequest) => {
  await dbConnect();
  try {
    const { email } = await request.json();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return apiResponse.badRequest({
        message: "User not found with email " + email,
      });
    }
    await UserModel.deleteOne({ _id: user._id });
    return apiResponse.ok({
      message: `User with email ${email} removed successfully`,
    });
  } catch (error) {
    return apiResponse.serverError({
      message: "Failed to delete user account",
    });
  }
};
