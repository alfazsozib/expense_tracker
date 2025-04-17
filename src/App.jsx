import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import Profile from "./components/Dashboard/Profile";
import Home from "./components/Dashboard/Home";
import SignUp from "./components/SignUp/SignUp";
import UserControl from "./components/Dashboard/UserControl";
import "./App.css";

function App() {
  return (

      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-control" element={<UserControl />} />
      </Routes>

  );
}

export default App;
