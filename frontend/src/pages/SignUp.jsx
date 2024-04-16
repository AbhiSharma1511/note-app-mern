import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/bgImage.jpg";
import axiosInstance from "../utils/axiosInstance.js";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error, setError] = useState(null);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      const data = {
        email: email,
        fullName: name,
        password: password
      }
      // console.log(data);
      // login api call
      try {
        const response = await axiosInstance.post("/create-user", data);
        // successfull
        // console.log(response)
        if(response.data && response.data.error){
          setError(response.data.message)
          return;
        }

        if(response.data && response.data.accessToken){
          localStorage.setItem("token", response.data.accessToken);
          navigate(("/home"))
        }
      } catch (error) {
        // console.log(error.response.data.message);
        if((error.response && error.response.data && error.response.data.message)){
          setError(error.response.data.message);
        }
        else{
          setError("An unexpected error occurred, please try again!");
        }
    // console.log("Form submitted");
  };
};

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md sm:w-full w-96 md:w-96 sm:mx-1 mx-2">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Enter your name"
                required
              />
            </div>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 font-bold"
            >
              Sign Up
            </button>
          </form>
          <h2 className="text-sm mt-4 flex">
            Already have an account?{" "}
            <Link to="/login">
              <h2 className="text-blue-500 hover:underline font-semibold ml-2">
                {" "}
                Login
              </h2>
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default SignUp;
