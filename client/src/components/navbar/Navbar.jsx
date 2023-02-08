import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
const data = localStorage.getItem("user");
const user = JSON.parse(data);

const NavButton = () => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/");
  };
  const navigate = useNavigate();
  if (data) {
    return (
      <div className="navItems">
        {user.name}
        <Link to={`/transaction/${user.name}`}>
          <button className="navButton">Transaction</button>
        </Link>

        <button onClick={logout} className="navButton">
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="navItems">
        <Link to="/Signup">
          <button className="navButton">sign up</button>
        </Link>
        <Link to="/Login">
          <button className="navButton">Login</button>
        </Link>
      </div>
    );
  }
};
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="linkhome">
          <span className="logo">Booking Website</span>
        </Link>
        <NavButton />
      </div>
    </div>
  );
};

export default Navbar;
