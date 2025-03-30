import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";  // Import 'Link' here
import Navbar from "../../components/commen/navbar";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const logInUser = () => {
        if (email.length === 0) {
            alert("Email has left Blank!");
        } else if (password.length === 0) {
            alert("Password has left Blank!");
        } else if (role.length === 0) {
            alert("Role has left Blank!");
        } else {
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password,
                role: role
            }, { withCredentials: true })
                .then(function (response) {
                    console.log(response);
                    const userRole = response.data.role;
                    if (userRole === "admin") {
                        navigate("/AdminHome");
                    } else if (userRole === "agent") {
                        navigate("/AgentHome");
                    } else if (userRole === "user") {
                        navigate("/AdminHome");
                    }
                })
                .catch(function (error) {
                    console.log(error, 'error');
                    if (error.response && error.response.status === 401) {
                        alert("Invalid credentials");
                    }
                });
        }
    }

    let imgs = [
        'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
    ];

    return (
        <div>
            <Navbar />
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={imgs[0]} className="img-fluid" alt="Login Illustration" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                                </div>

                                    <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                    />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                    />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="radio"
                                            name="role"
                                            value="admin"
                                            id="adminRadio"
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="adminRadio">
                                            Admin
                                        </label><br />
                                        <input
                                            className="form-check-input me-2"
                                            type="radio"
                                            name="role"
                                            value="agent"
                                            id="agentRadio"
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="agentRadio">
                                            Agent
                                        </label><br />
                                        <input
                                            className="form-check-input me-2"
                                            type="radio"
                                            name="role"
                                            value="user"
                                            id="userRadio"
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="userRadio">
                                            User
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg me-2" onClick={logInUser}>Login</button>
                                   
                                    {/* Use Link to wrap the Signup button */}
                                    <Link to="/signup">
                                        <button type="button" className="btn btn-primary btn-lg">Signup</button>
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
