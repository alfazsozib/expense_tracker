import React, { useEffect, useState } from "react";
import { FaPowerOff, FaUser, FaRegEdit } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import userImage from "../../assets/userImage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Chatbot from "../Chatbot";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", image: "" });
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  const [fixedBudget, setFixedBudget] = useState(0);
  const [usedExpense, setUsedExpense] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [categorySummary, setCategorySummary] = useState([]);

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
        setNewName(resUser.data.name); // Set the name when data is fetched

        // Updated avatar API using RoboHash
        const avatarUrl = `https://robohash.org/${resUser.data.name || 'Anonymous'}.png?size=120x120&set=set5`;
        setUser((prevUser) => ({ ...prevUser, image: avatarUrl }));

        const resBudget = await axios.get("http://localhost:5000/api/budget", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resExpenses = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

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

        let totalBudget = resBudget.data.amount;
        let totalExpenses = 0;
        const categories = {};

        budgetArray.forEach((b) => {
          totalBudget += b.amount;
          if (!categories[b.note]) {
            categories[b.note] = { budget: 0, expense: 0 };
          }
          categories[b.note].budget += b.amount;
        });

        expensesArray.forEach((e) => {
          totalExpenses += e.amount;
          if (!categories[e.note]) {
            categories[e.note] = { budget: 0, expense: 0, id:e._id, createdAt: e.createdAt };
          }
          categories[e.note].expense += e.amount;
        });

        const categorySummaryData = Object.entries(categories).map(
          ([cat, data]) => ({
            id: data.id,
            note: cat,
            budget: data.budget,
            expense: data.expense,
            diff: data.budget - data.expense,
            createdAt: data.createdAt
          })
        );

        setFixedBudget(totalBudget);
        setUsedExpense(totalExpenses);
        setRemainingBudget(totalBudget - totalExpenses);
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

  const handleDeleteBudgetItem = async (id) => {
    console.log(user)
    try {
      
      const res = await axios.delete(
        `http://localhost:5000/api/budget/${id}`,
        {userid: user._id},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Filter out budgets in that category
      const updatedCategorySummary = categorySummary.filter(
        (item) => item._id !== id
      );
  
      // Calculate new fixed and remaining budgets
      const newFixedBudget = updatedCategorySummary.reduce(
        (total, item) => total + item.budget,
        0
      );
      const newUsedExpense = updatedCategorySummary.reduce(
        (total, item) => total + item.expense,
        0
      );
  
      setFixedBudget(newFixedBudget);
      setUsedExpense(newUsedExpense);
      setRemainingBudget(newFixedBudget - newUsedExpense);
      setCategorySummary(updatedCategorySummary);
    } catch (err) {
      console.error("Failed to delete budget item:", err);
      alert("Failed to delete expense.");
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
        <div className="w-full bg-white rounded-[20px] p-6 mb-12">
          {/* Budget Cards */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 mt-8">
            <div className="bg-white rounded-[20px] border-solid border-2 border-[#00000033] p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Fixed Budget</h3>
              <p className="text-2xl font-bold">£{fixedBudget}</p>
            </div>
            <div className="bg-white rounded-[20px] border-solid border-2 border-[#00000033] p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Remaining Budget</h3>
              <p className="text-2xl font-bold">£{remainingBudget}</p>
            </div>
            <div className="bg-white rounded-[20px] border-solid border-2 border-[#00000033] p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Used Expense</h3>
              <p className="text-2xl font-bold">£{usedExpense}</p>
            </div>
          </div>

          {/* Monthly Expense Summary */}
          <div className="bg-white rounded-[20px] border border-[#00000066] p-4 w-full max-w-[1000px] m-auto overflow-auto">
            <h2 className="text-center text-xl font-medium mb-3">
              Monthly Expense Summary
            </h2>
            <div className="grid grid-cols-5 gap-2 text-center font-medium mb-2 min-w-[700px]">
              <span className="bg-gray-200 px-3 py-1 rounded">Notes</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Date</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Expense</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Difference</span>
              <span className="bg-gray-200 px-3 py-1 rounded">Remove</span>
            </div>

            {categorySummary.map((item, i) => (
              <div key={i} className="min-w-[700px]">
                <div className="grid grid-cols-5 gap-4 text-center text-sm py-1">
                  {console.log(item)}
                  <span>{item.note}</span>
                  <span>{new Date(item.createdAt).toISOString().split('T')[0]}</span>
                  <span>£{item.expense}</span>
                  <span className={item.diff < 0 ? "text-red-600" : "text-green-600"}>
                    £{item.diff}
                  </span>
                  <span
                    onClick={() => handleDeleteBudgetItem(item.id)}
                    className="bg-red-600 p-2 rounded-lg hover:bg-red-800 text-white cursor-pointer"
                  >
                    Remove
                  </span>
                </div>
              </div>
            ))}
                    
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
