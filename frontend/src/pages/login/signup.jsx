import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/commen/navbar";

const Signup = () => {
  const [isSignInActive, setIsSignInActive] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [tp, setTP] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsSignInActive(!isSignInActive);
  };

  // ------------------- LOGIN -------------------
  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:5000/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        const { user_id, user_email, role, username } = response.data;

        // Save to storage
        localStorage.setItem("userId", user_id);
        localStorage.setItem("user_email", user_email);
        localStorage.setItem("userRole", role);
        localStorage.setItem("username", username);

        sessionStorage.setItem("userId", user_id);
        sessionStorage.setItem("user_email", user_email);
        sessionStorage.setItem("userRole", role);
        sessionStorage.setItem("username", username);

        const navigationState = { userId: user_id, user_email };

        // Navigation logic based on DB role
        if (role === "customer") {
          navigate("/CustomerHome", { state: navigationState });
        } else if (role === "agent") {
          navigate("/AgentHome", { state: navigationState });
        } else if (role === "admin") {
          navigate("/AdminHome", { state: navigationState });
        } else {
          alert("Unknown role returned by server.");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("Login failed. Try again.");
        }
      });
  };

  // ------------------- SIGN UP -------------------
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !tp || !username || !rePassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== rePassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    axios
      .post("http://127.0.0.1:5000/auth/UsersignUp", {
        name,
        email,
        password,
        tp,
        username,
      })
      .then(() => {
        alert("Signup successful! Please log in.");
        setIsSignInActive(true);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 409) {
          alert("Email already exists!");
        } else {
          alert("Signup failed. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="back">
      <Navbar />
      <div
        className={`container ${isSignInActive ? "" : "right-panel-active"}`}
        id="container"
      >
        {/* ---------------- SIGN UP FORM ---------------- */}
        <div className="form-container sign-up-container">
          <form className="form" onSubmit={handleSignUp}>
            <h2>Create An Account</h2>

            <input
              className="input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="tel"
              placeholder="Telephone Number"
              value={tp}
              onChange={(e) => setTP(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Re-enter Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />

            <button className="button" type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* ---------------- SIGN IN FORM ---------------- */}
        <div className="form-container sign-in-container">
          <form className="form" onSubmit={handleSignIn}>
            <h1>Sign in</h1>

            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button" type="submit">
              Sign In
            </button>
          </form>
        </div>

        {/* ---------------- OVERLAY ---------------- */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Sign In for Your Account</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={togglePanel}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Create A New Account</h1>
              <p className="p">
                Enter your personal details and start your journey with us
              </p>
              <button className="ghost" id="signUp" onClick={togglePanel}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
