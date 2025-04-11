import React from "react";
import { FaRegEdit } from "react-icons/fa";
import HomeImage from "../../assets/Home.jpg";
import userImage from "../../assets/userImage.png";
const Profile = () => {
  return (
    <div className="w-[1440px] h-screen relative flex items-center justify-center overflow-hidden m-auto">
      {/* Blurred Background Image */}
      <img
        src={HomeImage}
        alt="Background"
        className="absolute inset-0 w-[1400px] object-cover blur-[6px] scale-105 z-0"
      />

      {/* Foreground Content */}
      <div className="w-[360px] bg-white rounded-[10px] p-6 shadow-lg border border-gray-200 z-10">
        {/* Profile Picture with Edit Icon */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-[140px] h-[140px] rounded-[10px]  overflow-hidden relative ">
            <img
              src={userImage}
              alt="Profile"
              className="w-[120px] h-[120px] object-cover mb-2 absolute inset-0 blur-[2px] scale-105 z-0 "
            />
            
            <div className="bg-amber-500">
              <FaRegEdit class="absolute inset-0 top-9 left-12 w-[40px] h-[40px] text-white " />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              type="text"
              defaultValue="Alfaz Hossain"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              University
            </label>
            <input
              type="text"
              defaultValue="Varendra University, Rajshahi"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Monthly Income
            </label>
            <input
              type="text"
              defaultValue="$100"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <button className="w-full bg-[#90E0EF] hover:bg-[#64cde3] text-black font-medium py-2 rounded mt-2">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
