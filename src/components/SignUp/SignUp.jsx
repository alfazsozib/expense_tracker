import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Image_1 from "../../assets/1.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    f_Name: "",
    l_Name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      if (res.status === 201) {
        alert("Account created successfully!");
        navigate("/"); // Navigate to login page
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-[100%] h-screen">
        {/* Left Side */}
        <div className="bg-white w-[50%] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-freehand mb-10">Welcome</h1>

          <div className="w-full max-w-md">
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col w-1/2">
                <label className="text-[20px] text-[#000] mb-1">First Name</label>
                <input
                  type="text"
                  name="f_Name"
                  onChange={handleChange}
                  className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-[20px] text-[#000] mb-1">Last Name</label>
                <input
                  type="text"
                  name="l_Name"
                  onChange={handleChange}
                  className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-[20px] text-[#000] mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-[20px] text-[#000] mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
              />
            </div>

            <button
              onClick={handleSignUp}
              className="w-full bg-sky-300 hover:bg-sky-500 text-[#000000bf] rounded mb-4 text-xl py-3"
            >
              Create Account
            </button>

            <p className="text-sm mt-5">
              Already have an account?
              <Link to={"/"} className="text-black underline ml-2">
                Login Here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-[#CAF0F8] w-[50%] flex justify-end pt-[2%] pl-[4%] pb-[2%]">
          <div className="bg-white w-full h-full pt-[3%] pl-[3.8%] pb-[3%]">
            <img src={Image_1} alt="" className="w-full h-full object-top" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
