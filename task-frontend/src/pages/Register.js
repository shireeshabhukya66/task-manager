import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("auth/register/", {
        username,
        password,
        role: "user",
      });

      console.log("SUCCESS:", res.data);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <div className="form-group">
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="full-btn" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;