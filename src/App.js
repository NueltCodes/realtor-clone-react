// import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>

        {/* <Profile /> */}
        {/* <Offers />
      <Signin />
      <SignUp />
      <ForgotPassword /> */}
      </Router>
    </>
  );
}

export default App;
