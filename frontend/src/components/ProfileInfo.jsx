import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileInfo = ({ user}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // console.log(user);
  const {fullName} = user
  // console.log(fullName);
  const initials = `${fullName.charAt(0)}`;

  const toggleMenu = () => {
    console.log("button clicked: ", menuOpen);
    setMenuOpen(!menuOpen);
  };

  const logoutHandle = ()=>{
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-between text-white sm:mr-10 mr-2">
      <div className="flex items-center">
        <div className="rounded-full text-lg bg-gray-500 text-white flex items-center justify-center w-12 h-12 mr-4 font-semibold">
          <button onClick={toggleMenu} className="sm:hidden">
            {initials}
          </button>
          <span className="hidden sm:inline">{initials}</span>
        </div>
        {menuOpen && (
          <div
            className="absolute mt-36 z-10 bg-white text-center sm:hidden rounded-md border-2 border-blue-300"
            style={{ right: "2px" }}
          >
            <div className="p-4 font-semibold">
              <h1 className="text-lg text-gray-600 hover:text-black">
                {fullName}
                {/* {firstName} {lastName} */}
              </h1>
              <button onClick={logoutHandle} className="hover:text-red-600  text-red-300 text-lg">
                Logout
              </button>
            </div>
          </div>
        )}
        <div className="text-center hidden sm:block">
          <h1 className="text-lg font-semibold">
            {fullName}
            {/* {firstName} {lastName} */}
          </h1>
          <button onClick={logoutHandle} className="text-white hover:text-gray-300">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
