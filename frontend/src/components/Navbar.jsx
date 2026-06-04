import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = () => {

  localStorage.removeItem("isLoggedIn");

  alert("Logged Out Successfully!");

  window.location.href = "/login";

}
  return (
    <nav className="navbar">

      <div className="logo-section">
        <img src={logo} alt="logo" />
        <h2>eLearn</h2>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search courses..." />
      </div>

      <div className="navbar-center">
        <Link to="/"><p>Home</p></Link>
        <Link to="/courses"><p>Courses</p></Link>
        <Link to="/about"><p>About</p></Link>
        
      </div>

      <div className="navbar-right">

        {
          loggedIn ? (

            <div>
       <div
  className="profile-icon"
  onClick={() => setDropdownOpen(!dropdownOpen)}
>
  👤
</div>

{
  dropdownOpen && (
    <div className="dropdown">

      <Link to="/dashboard">
        <p>My Dashboard</p>
      </Link>

      <Link to="/certificate">
  <p>Certificates</p>
</Link>
     <p onClick={handleLogout}>
  Logout
</p>

    </div>
  )
}
            </div>

          ) : (

            <div>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>

              <Link to="/register">
                <button className="register-btn">Register</button>
              </Link>
            </div>

          )
        }

      </div>

    </nav>
  );
}

export default Navbar;
        

 