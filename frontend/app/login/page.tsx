/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { PrimaryButton } from "../components/buttons/PrimaryButton";
import { CheckFeature } from "../components/CheckFeature";
import { BACKEND_URL } from "../config";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store login errors

  const handleLogin = async () => {
    try {
      setError(""); // Clear previous errors
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        username: email,
        password,
      });

      localStorage.setItem("token", res.data.token); // Store token
      router.push("/dashboard"); // Redirect after successful login
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Invalid email or password"); // Display error
    }
  };

  return (
    <>
      <Appbar />
      <div className="flex justify-center items-center p-12 mx-auto max-w-4xl">
        {/* Left Section - Features */}
        <div className="w-1/2 pr-8">
          <div className="font-bold text-2xl">
            Welcome back! Log in to continue automating with Kraven.
          </div>
          <div className="mt-4 space-y-2">
            <CheckFeature label="Seamless login experience." />
            <CheckFeature label="Access your workflows anytime." />
            <CheckFeature label="Secure and fast authentication." />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-1/2 flex flex-col items-center p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Log In</h2>

          <div className="w-full max-w-sm">
            <label className="block text-sm font-medium text-gray-700">* Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700">* Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-md mb-4"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="pt-4 flex justify-center">
              <PrimaryButton onclick={handleLogin} size="big">
                Log In
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
