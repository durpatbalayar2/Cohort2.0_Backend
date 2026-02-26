import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );

    console.log(res.data);

    // console.log(username, password);
  };
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            onInput={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            name="username"
            placeholder="Enter username"
          />

          <input
            onInput={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
          />

          <button className="log">Login</button>
        </form>
        <p>
          Do not have account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
