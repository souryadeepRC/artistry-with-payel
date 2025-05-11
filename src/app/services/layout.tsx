"use client";
import { SessionProvider } from "next-auth/react";

export default function ServiceLayout(props: any) {
  const { children, session } = props;
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
