import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/register", {
        username,
        password,
      });

      if (response.data.message === "Register successful") {
        setMessage("Registration successful! Please log in.");
        setUsername("");
        setPassword("");
        navigate("/login"); // Redirect to the login page after successful registration
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form className="ms-5 me-5" onSubmit={handleRegister}>
        <div>
          <label className="form-label">Username:</label>
          <input
            style={{ width: "30%" }}
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">Password:</label>
          <input
            style={{ width: "30%" }}
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn mt-3" type="submit">
          Register
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Registration;
