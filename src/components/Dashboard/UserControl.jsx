import React, { useState, useEffect } from "react";
import { FaPowerOff, FaRegEdit } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import userImage from "../../assets/userImage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Chatbot from "../Chatbot";

const UserControl = () => {
  const navigate = useNavigate();

  const [expenseNote, setExpenseNote] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [budgetMonth, setBudgetMonth] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const [user, setUser] = useState({ name: "", image: "" });
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const resUser = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resUser.data);
        setNewName(resUser.data.name);

        const avatarUrl = `https://robohash.org/${resUser.data.name || "Anonymous"}.png?size=120x120&set=set5`;
        setUser((prevUser) => ({ ...prevUser, image: avatarUrl }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameUpdate = async () => {
    try {
      const updateName = await axios.put(
        `http://localhost:5000/api/user/update-name/${user._id}`,
        { username: newName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Name updated successfully!");
      setUser(updateName.data);
      setEditingName(false);
    } catch (err) {
      console.error("Error updating name:", err);
      alert("Failed to update name.");
    }
  };

  const handleAddExpense = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/expenses",
        {
          note: expenseNote,
          amount: expenseAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Expense added!");
      setExpenseNote("");
      setExpenseAmount("");
    } catch (err) {
      alert("Failed to add expense");
      console.error(err);
    }
  };

  const handleAddBudget = async () => {
    try {
      console.log(budgetMonth)
      await axios.post(
        "http://localhost:5000/api/budget",
        {
          month: budgetMonth,
          amount: budgetAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Budget added!");
      setBudgetMonth("");
      setBudgetAmount("");
    } catch (err) {
      alert("Failed to add budget");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen max-w-[1440px] mx-auto bg-[#CAF0F8]">
      {/* Sidebar */}
      <div className="w-[340px] bg-[#CAF0F8] flex flex-col items-center justify-between pt-[60px] pb-[86px]">
        <div className="flex flex-col items-center">
          <img
            src={user.image || userImage}
            alt="Profile"
            className="w-[120px] h-[120px] object-cover mb-2 rounded-full"
          />
          <div className="flex items-center">
            {editingName ? (
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
                className="text-center font-medium text-xl text-[#000000b3] bg-transparent border-b-2 border-[#000000b3] focus:outline-none"
                onBlur={handleNameUpdate}
                autoFocus
              />
            ) : (
              <p className="text-center font-medium text-xl text-[#000000b3]">
                {user.username || "User Name"}
              </p>
            )}
            <FaRegEdit
              className="ml-2 cursor-pointer text-[#000000b3] hover:text-blue-600"
              onClick={() => setEditingName(true)}
            />
          </div>

          <div className="mt-5 w-[185px] h-2 bg-[#ffffff99] rounded-lg"></div>

          <div className="mt-8 space-y-4 w-full">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200"
            >
              <GoHomeFill className="w-[30px] h-[30px]" />
              <span className="text-lg font-light text-[#000000b3]">HOME</span>
            </Link>

            <Link
              to="/user-control"
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer hover:bg-white transition-all duration-200"
            >
              <PiSlidersHorizontalFill className="w-[30px] h-[30px]" />
              <span className="text-lg font-light text-[#000000b3]">USER CONTROL</span>
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
        <Chatbot />
      </div>

      {/* Main Content */}
      <div className="bg-[#CAF0F8] w-full h-screen overflow-y-auto p-12">
        <div className="w-full bg-white rounded-[20px] p-8 shadow-xl">
          {/* Set a Monthly Expense */}
          <div className="mb-16 w-full">
            <p className="text-2xl font-semibold mb-6 text-black">
              Set a Monthly Expense:
            </p>
            <div className="flex items-end space-x-6">
              <div>
                <label className="text-[#000000bf] text-lg font-medium mb-2 block">
                  Category
                </label>
                <input
                  name="Category"
                  type="text"
                  value={expenseNote}
                  onChange={(e) => setExpenseNote(e.target.value)}
                  className="w-[280px] h-[45px] bg-[#E5E5E5] rounded px-4 text-black"
                />
              </div>
              <div>
                <label className="text-[#000000bf] text-lg font-medium mb-2 block">
                  Amount
                </label>
                <input
                  name="Amount"
                  type="text"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="w-[280px] h-[45px] bg-[#E5E5E5] rounded px-4 text-black"
                />
              </div>
              <button
                onClick={handleAddExpense}
                className="py-2.5 px-6 bg-[#00B4D8] hover:bg-[#0096c7] cursor-pointer rounded-lg text-white text-lg font-semibold"
              >
                Add Expense
              </button>
            </div>
          </div>

          {/* Set a Monthly Budget */}
          <div className="w-full">
            <p className="text-2xl font-semibold mb-6 text-black">
              Set a Monthly Budget:
            </p>
            <div className="flex items-end space-x-6">
              <div>
                <label className="text-[#000000bf] text-lg font-medium mb-2 block">
                  Month
                </label>
                <input
                  name="Month"
                  type="text"
                  value={budgetMonth}
                  onChange={(e) => setBudgetMonth(e.target.value)}
                  className="w-[280px] h-[45px] bg-[#E5E5E5] rounded px-4 text-black"
                />
              </div>
              <div>
                <label className="text-[#000000bf] text-lg font-medium mb-2 block">
                  Amount
                </label>
                <input
                  name="Amount"
                  type="text"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  className="w-[280px] h-[45px] bg-[#E5E5E5] rounded px-4 text-black"
                />
              </div>
              <button
                onClick={handleAddBudget}
                className="py-2.5 px-6 bg-[#00B4D8] hover:bg-[#0096c7] cursor-pointer rounded-lg text-white text-lg font-semibold"
              >
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
