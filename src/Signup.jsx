import { Link } from "react-router-dom";
import "./Login.css";

export default function Signup() {
  return (
    <div className="login-page">
      <h1 className="login-title">Create Account</h1>
      <p className="login-sub">Sign up to get started</p>

      <form className="login-form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>

      <Link to="/login">
        <p className="signup-link">Already have an account? Log in</p>
      </Link>

      <Link to="/">
        <button className="back-btn">← Back</button>
      </Link>
    </div>
  );
}
