import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-page">
      <h1 className="login-title">Welcome Back</h1>
      <p className="login-sub">Log in to continue</p>

      <form className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <Link to="/signup">
        <p className="signup-link">Don't have an account? Sign up</p>
      </Link>

      <Link to="/">
        <button className="back-btn">← Back</button>
      </Link>
    </div>
  );
}
