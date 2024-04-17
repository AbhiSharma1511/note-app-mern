import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";
import axiosInstance from "../utils/axiosInstance.js";
import {useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(null);
  const [addItemDiv, setAddItemDiv] = useState({
    isShown: false,
    type: "",
    data: null,
  });

  const handleEdit = (noteDetails) => {
    setAddItemDiv({ isShown: true, type: "Edit", data: noteDetails });
  };

  const handleDelete = (noteDetails) => {
    
  };

  // for getting user data
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        // console.log(response);
        // console.log(response.data.user);
        // console.log(response.data.user.fullName);
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  // get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  const addToggleButton = () => {
    setAddItemDiv({ isShown: true, type: "Add", data: null });
  };

  return (
    <>
      <Navbar user={userInfo} />
      {error ? (
        <div>
          {" "}
          <h2>{error}</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {allNotes.length > 0 ? (
            allNotes.map((item) => (
              <div key={item._id} className="mb-4">
                <NoteCard
                  data={item}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete}
                  onPinNote={() => {}}
                />
              </div>
            ))
          ) : (
            <div className="w-screen flex justify-center items-center">
              <h2 className="text-black sm:text-2xl text-md">
                You did not create any note till yet, note it now 🙂
              </h2>
            </div>
          )}
        </div>
      )}
      <button
        onClick={addToggleButton}
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed sm:right-10 right-2 sm:bottom-10 bottom-2"
      >
        <MdAdd className="text-3xl text-white " />
      </button>

      <Modal
        isOpen={addItemDiv.isShown}
        onRequestClose={() => {}}
        contentLabel=""
        className={`min-w-min`}
      >
        <AddEditNotes
          addBtnClicked={addItemDiv}
          onClose={() => {
            setAddItemDiv({ isShown: false, type: "", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
