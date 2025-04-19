import React, { useEffect, useState } from "react";
import { FaPowerOff, FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import userImage from "../../assets/userImage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Chatbot from "../Chatbot";

const Home = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    fixedBudget: 0,
    fixedExpense: 0,
    usedExpense: 0,
  });
  const [categorySummary, setCategorySummary] = useState([]);
  const [user, setUser] = useState({ name: "", image: "" });

  // Fetch token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // redirect to login if no token
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user data
        const resUser = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resUser.data);

        console.log("User API response:", resUser.data);

        // Fetch budget
        const resBudget = await axios.get("http://localhost:5000/api/budget", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch expenses
        const resExpenses = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Budget API response:", resBudget.data);
        console.log("Expenses API response:", resExpenses.data);

        const budgetArray = Array.isArray(resBudget.data?.data)
          ? resBudget.data.data
          : Array.isArray(resBudget.data)
          ? resBudget.data
          : [];

        const expensesArray = Array.isArray(resExpenses.data?.data)
          ? resExpenses.data.data
          : Array.isArray(resExpenses.data)
          ? resExpenses.data
          : [];

        let totalBudget = 0;
        let totalExpenses = 0;
        const categories = {};

        budgetArray.forEach((b) => {
          totalBudget += b.amount;
          if (!categories[b.category]) {
            categories[b.category] = { budget: 0, expense: 0 };
          }
          categories[b.category].budget += b.amount;
        });

        expensesArray.forEach((e) => {
          totalExpenses += e.amount;
          if (!categories[e.category]) {
            categories[e.category] = { budget: 0, expense: 0 };
          }
          categories[e.category].expense += e.amount;
        });

        const categorySummaryData = Object.entries(categories).map(
          ([cat, data]) => ({
            category: cat,
            budget: data.budget,
            expense: data.expense,
            diff: data.budget - data.expense,
          })
        );

        setSummary({
          fixedBudget: totalBudget,
          fixedExpense: totalExpenses,
          usedExpense: totalExpenses,
        });

        setCategorySummary(categorySummaryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen max-w-[1440px] mx-auto bg-[#CAF0F8]">
      {/* Sidebar */}
      <div className="w-[240px] bg-[#CAF0F8] flex flex-col items-center justify-between pt-[60px] pb-[86px]">
        <div className="flex flex-col items-center">
          <img
            src={user.image || userImage}
            alt="Profile"
            className="w-[120px] h-[120px] object-cover mb-2 rounded-full"
          />
          <p className="text-center font-medium text-xl text-[#000000b3]">
            {user.username || "User Name"}
          </p>

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
        <Chatbot />
      </div>

      {/* Main Content */}
      <div className="bg-[#CAF0F8] w-full h-screen overflow-y-auto p-12">
        <div className="w-full bg-white rounded-[20px] p-6 mb-12">
          {/* Budget Cards */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 mt-8">
            {[ 
              { title: "Fixed Budget", amount: `£${summary.fixedBudget}` },
              { title: "Fixed Expense", amount: `£${summary.fixedExpense}` },
              { title: "Used Expense", amount: `£${summary.usedExpense}` },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] border-solid border-2 border-[#00000033] p-6 text-center"
              >
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-2xl font-bold">{item.amount}</p>
              </div>
            ))}
          </div>

          {/* Monthly Expense Summary */}
          <div className="bg-white rounded-[20px] border border-[#00000066] p-6 w-full max-w-[800px] m-auto overflow-auto">
            <h2 className="text-center text-xl font-medium mb-3">
              Monthly Expense Summary
            </h2>
            <div className="grid grid-cols-4 gap-4 text-center font-medium mb-2 min-w-[700px]">
              <span className="bg-gray-200 px-3 py-1 rounded">Category</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Budget</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Expense</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Difference</span>
            </div>
            {categorySummary.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 text-center text-sm py-1 min-w-[700px]"
              >
                <span>{item.category}</span>
                <span>£{item.budget}</span>
                <span>£{item.expense}</span>
                <span className={item.diff < 0 ? "text-red-600" : "text-green-600"}>
                  £{item.diff}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
