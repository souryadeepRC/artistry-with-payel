"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children, session }: any) => {
  console.log({ session });

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default AuthProvider;
