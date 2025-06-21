import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api-service/auth/login.api";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState({ q: "", a: "" }); 
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    let ignore = false;
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    if (isLoggedIn === "true") {
      role === "ADMIN" ? navigate("/admin") : navigate("/dashboard");
    }
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        if (!ignore) setQuote({ q: data.content, a: data.author });
      } catch (error) {
        setQuote({
          q: "A room without books is a body without soul",
          a: "Cicero",
        });
      }
    };

    fetchQuote();
    return () => {
      ignore = true;
    };
  }, []);

  const LoginOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", response.accessToken);
      const user = JSON.parse(atob(response.accessToken.split(".")[1])) ?? {};
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);
      toast.success("Welcome");
      user.role === "ADMIN" ? navigate("/admin") : navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gradient-to-br from-blue-700 to-purple-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold italic text-center max-w-xl">
          “{quote.q}”
        </h1>
        <p className="mt-4 text-xl font-medium">— {quote.a}</p>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white px-8 py-12 shadow-lg">
        <div className="w-full max-w-md border rounded-xl p-15 bg-gradient-to-br from-white-100 to-blue-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Employee Login
          </h2>
          <form onSubmit={LoginOnSubmit} className="space-y-4 ">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
