import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import Searchbar from "./Searchbar";

const Navbar = ({user, onSearchNotes, handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  // console.log(user);

  const handleSearch = () => {
    // Implement search functionality here
    // console.log(searchQuery);
    // if(searchQuery=="") {handleClearSearch();}
    if(searchQuery.trim()){
    onSearchNotes(searchQuery)}
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-blue-500 p-2 flex justify-between items-center w-full rounded-b-lg">
      <div className="mb-1 sm:mb-2">
        <h1 className="text-white sm:text-3xl font-bold ml-10 text-xl">
          Notes
        </h1>
      </div>
      <div className="sm:flex hidden">
        <Searchbar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>
      <div>
        {user ? (
          <ProfileInfo user={user} />
        ) : (
          <button className="bg-white text-blue-500 px-4 sm:py-2  py-1 rounded-lg mb-2 sm:mb-0 sm:mr-10 mr-5 sm:text-lg text-sm font-semibold">
            SignIn
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
