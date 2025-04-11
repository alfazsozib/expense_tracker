import React from "react";
import { FaPowerOff, FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import userImage from "../../assets/userImage.png"; // Replace with correct path

const Home = () => {
  return (
    <div className="flex h-screen w-[1440px] mx-auto bg-[#CAF0F8]" > {/* Fixed screen width */}
      {/* Sidebar */}
      <div className="w-[240px] bg-[#CAF0F8] flex flex-col items-center p-4 justify-between pt-[60px] pb-[86px]">
        <div className="flex flex-col items-center">
          <img
            src={userImage}
            alt="Profile"
            className="w-[120px] h-[120px] object-cover mb-2"
          />
          <p className="text-center font-medium text-xl text-[#000000b3]">
            Alfaz Hossain
          </p>

          <div className="mt-5 w-[185px] h-2 bg-[#ffffff99] rounded-lg"></div>
          <div className="mt-8 space-y-4 w-full">
            <div className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200">
              <GoHomeFill className="w-[30px] h-[30px]" />
              <span className="text-lg font-light text-[#000000b3]">HOME</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200">
              <FaUser className="w-[30px] h-[30px]" />
              <span className="text-lg font-light text-[#000000b3]">
                PROFILE
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200">
              <PiSlidersHorizontalFill className="w-[30px] h-[30px]" />
              <span className="text-lg font-light text-[#000000b3]">
                USER CONTROL
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200">
          <FaPowerOff className="w-[22px] h-[22px]" />
          <span className="text-lg font-light text-[#000000b3]">SIGN OUT</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#CAF0F8] flex items-center justify-center pt-[25px] pb-[25px] ">
        <div className="w-[1120px] h-full bg-white rounded-[20px]">
          {/* Budget Cards */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 mt-8 ">
            {[
              { title: "Fixed Budget", amount: "$500" },
              { title: "Fixed Expense", amount: "$400" },
              { title: "Used Expense", amount: "$300" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] border-solid border-2 border-[#00000033] p-6 w-[220px] text-center"
              >
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-2xl font-bold">{item.amount}</p>
              </div>
            ))}
          </div>

          {/* Recent Expenses */}
          <div className="bg-white w-full max-w-[1040px] rounded-[20px] border border-[#00000066] px-2 pb-4 pt-2 mb-6 m-auto">
            <h2 className="text-center text-xl font-medium mb-4">
              Recent Expenses
            </h2>
            <hr className="mb-4 w-[900px] m-auto" />
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex justify-evenly">
                <span className="bg-[#0000001a] px-3 py-1 rounded text-sm font-medium">
                  Category
                </span>
                {Array(5)
                  .fill("Category 1")
                  .map((cat, i) => (
                    <span key={i}>{cat}</span>
                  ))}
              </div>
              <div className="flex justify-evenly">
                <span className="bg-[#0000001a] px-3 py-1 rounded text-sm font-medium">
                  Amount
                </span>
                {Array(5)
                  .fill("Amount 1")
                  .map((amt, i) => (
                    <span key={i}>{amt}</span>
                  ))}
              </div>
            </div>
          </div>

          {/* Monthly Expense Summary */}
          <div className="bg-white rounded-[20px] border border-[#00000066] p-6 w-full max-w-[1040px] m-auto">
            <h2 className="text-center text-xl font-medium mb-3">
              Monthly Expense Summary
            </h2>
            <div className="grid grid-cols-4 gap-4 text-center font-medium mb-2">
              <span className="bg-gray-200 px-3 py-1 rounded">Category</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Budget</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Expense</span>
              <span className="bg-gray-200 px-3 py-1 rounded">-/+</span>
            </div>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-4 text-center text-sm py-1"
                >
                  <span>Category 1</span>
                  <span>Amount 1</span>
                  <span>Amount 1</span>
                  <span>Amount 1</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
