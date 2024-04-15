import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bgImage.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100 sm:px-0 px-4"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <form className="space-y-4">
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
                name="email"
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="button"
              className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 font-bold"
            >
              Login
            </button>
          </form>
          <p className="text-sm mt-4 flex">
            Don't have an account?{" "}
            <Link to="/signup">
              <h2 className="text-blue-500 hover:underline font-semibold ml-2">
                {" "}
                SignUp
              </h2>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
