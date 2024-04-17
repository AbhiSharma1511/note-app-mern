import React from "react";
import { MdNoteAdd } from "react-icons/md";
import noDataImage from "../assets/no-data1.jpg";

const EmptyCard = ({ isSearch }) => {
  return (
    <div className="fixed top-16 left-0 w-full h-full flex items-center justify-center">
      <div className="flex gap-2 bg-gray-300 p-6 shadow-md rounded-md">
        <div className="bg-white p-6 rounded-lg shadow-md ">
          {isSearch ? (
            <img src={noDataImage} className="h-14 w-14" />
          ) : (
            <MdNoteAdd className="text-6xl text-gray-600" />
          )}
        </div>
        <div className="mt-4 text-center">
          {isSearch ? (
            <div></div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                You haven't created any notes yet!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Start by adding a new note using the button below.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
