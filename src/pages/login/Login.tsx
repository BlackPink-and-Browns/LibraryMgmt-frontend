import React, { useEffect, useState } from "react";
import "./Login.css"; // Make sure this file has the styles
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api-service/auth/login.api";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  async function LoginOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ email: email, password: password })
      .unwrap()
      .then((response) => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response.accessToken);
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
          const user = JSON.parse(atob(accessToken.split(".")[1])) ?? {};
          localStorage.setItem("role", user.role);
          localStorage.setItem("userId", user.id);
          toast.success("Welcome")
          user.role === "ADMIN" ? navigate("/admin") : navigate("/dashboard");
        }
      })
      .catch((error) => {
        toast.error(error.data.message)
        setLoginError(error.data.message);
        console.log(error);
      });
  }
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const role=localStorage.getItem("role");
      role === "ADMIN" ? navigate("/admin") : navigate("/dashboard");
      return;
    }
  }, []);
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Employee Login</h2>
        <form className="login-form" onSubmit={LoginOnSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            {isLoading ? "Loading":"Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
