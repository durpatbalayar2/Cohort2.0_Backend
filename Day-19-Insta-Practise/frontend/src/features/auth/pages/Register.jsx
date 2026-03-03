import "../style/form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);
    navigate("/login");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleForm}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Enter the username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Enter the email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
          />

          <button className="button sec-btn">Register</button>
        </form>

        <p>
          Already have an account ?<Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
