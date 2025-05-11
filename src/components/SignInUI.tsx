"use client";
import { useState } from "react";

const SignInUI = ({ onSignIn }: any) => {
  const [userInput, setUserInput] = useState({
    email: "test@mail.com",
    password: "Test@1234",
  });

  const handleEmailChange = (event: any) => {
    setUserInput((userInput) => ({ ...userInput, email: event?.target.value }));
  };
  const handlePasswordChange = (event: any) => {
    setUserInput((userInput) => ({
      ...userInput,
      password: event?.target.value,
    }));
  };
  const handleSignIn = () => {
    onSignIn(userInput);
  };
  return (
    <div>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={userInput.email}
          onChange={handleEmailChange}
          placeholder=""
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          value={userInput.password}
          onChange={handlePasswordChange}
          placeholder=""
        />
      </div>
      <button onClick={handleSignIn}>Login</button>
    </div>
  );
};
export default SignInUI;
