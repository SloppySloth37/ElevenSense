// src/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LiquidEther from "./components/LiquidEther";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -------------------------------------------------------
     LOGIN REQUEST
  ------------------------------------------------------- */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameOrEmail: form.identifier.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login credentials.");
        setLoading(false);
        return;
      }

      // Store access token
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      setInfo("Login successful! Redirecting...");
      setTimeout(() => navigate("/feed"), 800);
    } catch (err) {
      setError("Something went wrong while logging in.");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */
  return (
    <div className="auth-page">
      <div className="auth-bg">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
        />
      </div>

      <div className="auth-container">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-sub">Log in to continue</p>

        {error && <div className="auth-error">{error}</div>}
        {info && <div className="auth-info">{info}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            name="identifier"
            type="text"
            placeholder="Email or Username"
            value={form.identifier}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                // Eye (open)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                // Eye-off (closed)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.9 21.9 0 0 1 5.06-6.06" />
                  <path d="M1 1l22 22" />
                  <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12" />
                  <path d="M14.12 9.88A3 3 0 0 1 9.88 14.12" />
                </svg>
              )}
            </button>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Create one
          </Link>
        </p>

        <Link to="/" className="back-btn">← Back</Link>
      </div>
    </div>
  );
}