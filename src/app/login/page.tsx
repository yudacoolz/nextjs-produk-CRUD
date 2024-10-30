"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // or "next/router" if you're on Next.js 13 or older
import axios from "axios";
import { useAuth } from "@/contexts/useAuth";

const LoginPage = () => {
  const isAuthenticated = useAuth();
  console.log("isAuthenticated", isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/auth",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(data);

      localStorage.setItem("token", data.token);
      router.push("/product");
    } catch (error) {
      console.log("error login : ", error);
      alert("gagal login");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-700">
      <div className="bg-white rounded-xl p-3">
        <h3>LOGIN PLEASE</h3>
        <div className="flex flex-col">
          <p>admin123@gmail.com</p>
          <p>admin123</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex items-center gap-3">
            <label htmlFor="email">Email</label>
            <input
              className=" p-2 rounded-md border"
              type="text"
              name="email"
              placeholder="admin123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <label htmlFor="password">Password</label>
            <input
              className=" p-2 rounded-md border"
              type="password"
              name="password"
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="p-2 rounded-lg bg-blue-600 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
