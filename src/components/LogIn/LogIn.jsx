import React from "react";
import Image_1 from "../../assets/1.png";

const LogIn = () => {
  return (
    <div>
      <div className="flex w-full">
        {/* Left Side - LogIn Form */}
        <div className="w-[60%]  px[137px] pt-[150px] flex flex-col justify-center items-center bg-white p-10">
          <h1 className="text-4xl font-freehand mb-10">Welcome</h1>

          <div className="w-full max-w-md">
            <div className="flex flex-col mb-4">
              <label className="text-[20px] font-normal text-[#000] mb-1 ">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-[20px] font-normal text-[#000] mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
              />
            </div>

            <button
              name="submit"
              className="w-full bg-sky-300 text-[#000000bf] rounded mb-4 text-xl py-3 "
            >
              Log In
            </button>

            <p className=" text-[#000] text-xl font-normal mt-[19px]  text-center flex justify-center flex-col">
              Or
              <a href="#" className="text-xl font-normal text-[#000] mt-3 ">
                Create an Account
              </a>
            </p>
        </div>
          <div className="flex gap-2 mt-[220px]">
            <div className="w-[170px] h-2 bg-sky-400 rounded-full"></div>
            <div className="w-[170px] h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Dashboard Preview */}
        <div className="w-[40%] h-screen bg-[#CAF0F8] flex justify-end items-center rounded-l-[10px]">
          <div className="bg-white w-[620px] h-[807px] rounded flex justify-end items-center">
            <img
              src={Image_1}
              alt="Dashboard Preview"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
