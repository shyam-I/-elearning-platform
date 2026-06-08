import "./Register.css";
import { useState } from "react";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function handleRegister() {
        if (username === "" || password === "") {
   alert("Please fill all fields");
   return;
}

        fetch("https://elearning-backend-k1bx.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "User registered successfully") {
                alert("Registration successful!");
                navigate("/login");
            } else {
                alert("Registration failed!");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
    return (
        <section className="register">
            <div className="register-container">
                <h2>Register</h2>
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
                <button onClick={handleRegister}>
                    Register
                </button>
            </div>
        </section>
    );
}
export default Register;
