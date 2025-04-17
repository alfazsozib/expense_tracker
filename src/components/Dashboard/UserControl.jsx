import React from "react";
import { FaPowerOff, FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import userImage from "../../assets/userImage.png"; // Replace with correct path
import { Link, useNavigate } from "react-router-dom";

const UserControl = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and redirect to login page
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen max-w-[1440px] mx-auto bg-[#CAF0F8]">
      {/* Sidebar */}
      <div className="w-[240px] bg-[#CAF0F8] flex flex-col items-center justify-between pt-[60px] pb-[86px]">
        <div className="flex flex-col items-center">
          <img
            src={userImage}
            alt="Profile"
            className="w-[120px] h-[120px] object-cover mb-2"
          />
          <p className="text-center font-medium text-xl text-[#000000b3]">
            Bob John
          </p>

          <div className="mt-5 w-[185px] h-2 bg-[#ffffff99] rounded-lg"></div>

          <div className="mt-8 space-y-4 w-full">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200"
            >
              <GoHomeFill className="w-[30px] h-[30px]" />
              <span className="text-lg font-light text-[#000000b3]">HOME</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200"
            >
              <FaUser className="w-[30px] h-[30px]" />
              <span className="text-lg font-light text-[#000000b3]">PROFILE</span>
            </Link>

            <Link
              to="/user-control"
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200"
            >
              <PiSlidersHorizontalFill className="w-[30px] h-[30px]" />
              <span className="text-lg font-light text-[#000000b3]">
                USER CONTROL
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center mt-8 gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200">
          <FaPowerOff className="w-[22px] h-[22px]" />
          <button
            onClick={handleLogout}
            className="text-lg font-light text-[#000000b3]"
          >
            SIGN OUT
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#CAF0F8] flex items-center justify-center pt-[25px] pb-[25px]">
        <div className="w-[1125px] h-full bg-white rounded-[20px] flex flex-col items-start p-10">
          {/* Set a Monthly Expense */}
          <div className="mb-12 w-full">
            <p className="text-xl font-medium mb-6 text-black">
              Set a Monthly Expense:
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text[#000000bf] text-xl font-normal mb-2">
                  Category
                </p>
                <input
                  name="Category"
                  type="text"
                  className="w-[430px] h-[45px] bg-[#E5E5E5] rounded px-3"
                />
              </div>
              <div>
                <p className="text-[#000000bf] text-xl font-normal mb-2">
                  Amount
                </p>
                <input
                  name="Amount"
                  type="text"
                  className="w-[430px] h-[45px] bg-[#E5E5E5] rounded px-3"
                />
              </div>
              <button className=" mt-9 py-2 px-4 bg-[#90E0EF] hover:bg-[#72bbc7] cursor-pointer rounded text-black text-xl font-medium">
                Add Expense
              </button>
            </div>
          </div>

          {/* Set a Monthly Budget */}
          <div className="w-full">
            <p className="text-xl font-medium mb-6 text-black">
              Set a Monthly Budget:
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-[#000000bf] text-xl font-normal mb-2">
                  Month
                </p>
                <input
                  name="Month"
                  type="text"
                  className="w-[430px] h-[45px] bg-[#E5E5E5] rounded px-3"
                />
              </div>
              <div>
                <p className="text-[#000000bf] text-xl font-normal mb-2">
                  Amount
                </p>
                <input
                  name="Amount"
                  type="text"
                  className="w-[430px] h-[45px] bg-[#E5E5E5] rounded px-3"
                />
              </div>
              <button className="mt-9 py-2 px-4 bg-[#90E0EF] hover:bg-[#72bbc7] cursor-pointer rounded text-black text-xl font-medium">
                Add Budget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserControl;
