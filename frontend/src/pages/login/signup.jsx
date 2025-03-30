import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/commen/navbar";

const Signup = () => {
    const [isSignInActive, setIsSignInActive] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [tp, setTP] = useState(''); // Telephone number
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePanel = () => {
        setIsSignInActive(!isSignInActive);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (!email || !password || !role) {
            alert("Please fill in all fields");
            return;
        }
    
        // API call for login
        axios.post('http://127.0.0.1:5000/login', {
            email: email,
            password: password,
            role: role
        }, { withCredentials: true })
        .then(response => {
            const userRole = response.data.role;
            const userId = response.data.id; // Access the user ID from the response
            const user_email = response.data.user_email; 
            const username = response.data.username; 
            
            localStorage.setItem("userId", response.data.user_id);
            localStorage.setItem("user_email", response.data.user_email);
            localStorage.setItem("userRole", response.data.role);
            localStorage.setItem("username", response.data.username);

            sessionStorage.setItem("userId", response.data.user_id);
            sessionStorage.setItem("user_email", response.data.user_email);
            sessionStorage.setItem("userRole", response.data.role);
            sessionStorage.setItem("username", response.data.username);
            
            console.log('User ID:', userId); // Log the user ID to the console
            console.log('User email:', user_email);
            console.log('User name:', username);
            
            const navigationState = { userId, user_email }; // Combine state into one object
            
            if (userRole === "customer") {
                navigate("/CustomerHome", { state: navigationState });
            } else if (userRole === "agent") {
                navigate("/AgentHome", { state: navigationState });
            } else if (userRole === "user") {
                navigate("/AdminHome", { state: navigationState });  // Adjusted the route for 'user'
            }
        })
        .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
    };

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

        setLoading(true); // Set loading to true before API call

        // API call for signup
        axios.post('http://127.0.0.1:5000/UsersignUp', {
            name,
            email,
            password,
            tp,
            username,
        })
        .then(response => {
            alert("Signup successful! Please log in.");
            setIsSignInActive(true); // Switch to sign-in form
        })
        .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 409) {
                alert("Signup failed: Email already exists!");
            } else {
                alert("Signup failed. Please try again.");
            }
        })
        .finally(() => {
            setLoading(false); // Reset loading state after API call
        });
    };

    return (
        <div className='back'>
            <Navbar />
            <div className={`container ${isSignInActive ? '' : 'right-panel-active'}`} id="container">
                
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form className='form' onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <input 
                            className='input' 
                            type="text" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                        <input 
                            className='input' 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            className='input' 
                            type="tel" 
                            placeholder="Telephone Number" 
                            value={tp} 
                            onChange={(e) => setTP(e.target.value)} 
                        />
                        <input 
                            className='input' 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            className='input' 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <input 
                            className='input' 
                            type="password" 
                            placeholder="Re-enter Password" 
                            value={rePassword} 
                            onChange={(e) => setRePassword(e.target.value)} 
                        />
                        <button className='button' type="submit" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form className='form' onSubmit={handleSignIn}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input 
                            className='input' 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            className='input' 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />

                        {/* Role Selection */}
                        <div className="form-check role-selection">
                            <div className="radio-group">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    value="customer"
                                    id="adminRadio"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="adminRadio">User</label>
                            </div>
                            <div className="radio-group">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    value="agent"
                                    id="agentRadio"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="agentRadio">Agent</label>
                            </div>
                            <div className="radio-group">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    value="user"
                                    id="userRadio"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="userRadio">Admin</label>
                            </div>
                        </div>

                        <button className='button' type="submit">Sign In</button>
                    </form>
                </div>

                {/* Overlay Panel */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p className='p'>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={togglePanel}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p className='p'>Enter your personal details and start your journey with us</p>
                            <button className="ghost" id="signUp" onClick={togglePanel}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
