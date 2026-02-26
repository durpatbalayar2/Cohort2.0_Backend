import React from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(username, email, password);
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );
    console.log(res.data);
    // setUsername("");
    // setEmail("");
    // setPassword("");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            name="username"
            placeholder="Enter your name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Enter your gamil"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
          />

          <button className="reg">Register</button>
        </form>
        <p>
          Do you have account already ?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
