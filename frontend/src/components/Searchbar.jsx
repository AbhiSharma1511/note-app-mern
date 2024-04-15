import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="md:w-80 w-56 flex items-center px-4 bg-slate-100 rounded-md ">
      <input
        type="text"
        placeholder="Search Notes..."
        value={value}
        onChange={onChange}
        className="w-full bg-transparent rounded-md py-[11px] outline-none "
      />
      <div className="ml-2 flex items-center">
        {value && (
          <IoMdClose
            onClick={onClearSearch}
            className="text-xl text-slate-400 mx-2 hover:text-black"
          />
        )}

        <FontAwesomeIcon
          icon={faSearch}
          className="text-slate-400 hover:text-black"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default Searchbar;
