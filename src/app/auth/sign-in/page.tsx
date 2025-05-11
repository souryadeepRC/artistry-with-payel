"use client";
import LoginModal from "@/components/LoginModal";
import SignInUI from "@/components/SignInUI";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignInUser() {
  const route = useRouter();
  const signInByEmail = async (userInput: any) => {
    console.log(userInput);
    try {
      const response = await axios.post("/api/auth/sign-in", userInput, {
        withCredentials: true,
      });
      console.log({ response });
      route.push("/services");
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div>
      <SignInUI onSignIn={signInByEmail} />
    </div>
  );
}
