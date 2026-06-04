import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (username === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
        
          alert("Login successful!");

          localStorage.setItem("userId", data.userId);
          localStorage.setItem("email", data.email);
          localStorage.setItem("isLoggedIn",true);
          navigate("/dashboard");
        } else {
          alert("Login failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <section className="login">
      <div className="login-container">
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </section>
  );
}

export default Login;
