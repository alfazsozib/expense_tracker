import React, { useState } from "react";
import Image_1 from "../../assets/1.png";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg("Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-full h-screen">
        {/* Left Side - LogIn Form */}
        <div className="bg-white w-[50%] items-center flex flex-col justify-center">
          <h1 className="text-4xl font-freehand mb-10">Welcome</h1>

          <div className="w-full max-w-md">
            <div className="flex flex-col mb-4">
              <label className="text-[20px] font-normal text-[#000] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-[20px] font-normal text-[#000] mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
              />
            </div>

            {errorMsg && <p className="text-red-500 text-center mb-2">{errorMsg}</p>}

            <button
              onClick={handleLogin}
              className="w-full bg-sky-300 cursor-pointer hover:bg-sky-500 text-[#000000bf] rounded mb-4 text-xl py-3"
            >
              Log In
            </button>

            <p className="text-[#000] text-xl font-normal mt-[19px] text-center flex justify-center flex-col">
              Or
              <Link to="/signup" className="text-xl font-normal text-[#000] mt-3">
                Create an Account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Dashboard Preview */}
        <div className="bg-[#CAF0F8] w-[50%] flex justify-end pt-[2%] pl-[4%] pb-[2%]">
          <div className="bg-white w-full h-full pt-[3%] pl-[3.8%] pb-[3%]">
            <img src={Image_1} alt="" className="w-full h-full object-top" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
