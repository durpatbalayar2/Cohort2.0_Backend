import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
    console.log("user logged in")
    navigate("/");
  };

  if(loading){
    return <main>
      <h1>Loading.....</h1>
    </main>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleForm}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Enter the username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
          />

          <button className="button prim-btn">login</button>
        </form>

        <p>
          Donot you have account ?<Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
