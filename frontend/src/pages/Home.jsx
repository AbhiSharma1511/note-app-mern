import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance.js";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const data = [
    {
      id: 1,
      title: "Meeting on 7th April",
      date: "3rd April 2024",
      content:
        "Sure! You can achieve that by using min-w-min class from Tailwind CSS. This class sets the minimum width of the element to fit its content.",
      tags: "#meeting",
      isPinned: true,
      onEdit: () => {},
      onDelete: () => {},
      onPinNote: () => {},
    },
    {
      id: 2,
      title: "Meeting on 7th April",
      date: "3rd April 2024",
      content:
        "Sure! You can achieve that by using min-w-min class from Tailwind CSS. This class sets the minimum width of the element to fit its content.",
      tags: "#meeting",
      isPinned: true,
      onEdit: () => {},
      onDelete: () => {},
      onPinNote: () => {},
    },
    {
      id: 3,
      title: "Meeting on 7th April",
      date: "3rd April 2024",
      content:
        "Sure! You can achieve that by using min-w-min class from Tailwind CSS. This class sets the minimum width of the element to fit its content.",
      tags: "#meeting",
      isPinned: true,
      onEdit: () => {},
      onDelete: () => {},
      onPinNote: () => {},
    },
  ];

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //for fetching all notes
  

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
      if(error.response.status == 401){
        localStorage.clear();
        navigate("/login")
      }
    }
  }
  // get all notes
  const getAllNotes = async ()=>{
    
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const [addItemDiv, setAddItemDiv] = useState({
    isShown: false,
    type: "",
    data: null,
  });

  const addToggleButton = () => {
    setAddItemDiv({ isShown: true, type: "Add New", data: null });
  };
  const editToggleButton = () => {
    setAddItemDiv({ isShown: true, type: "Edit Note", data: null });
  };

  return (
    <>
      <Navbar user = {userInfo}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {data.map((item) => (
          <div key={item.id} className="mb-4">
            <NoteCard data={item} />
          </div>
        ))}
      </div>
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
            setAddItemDiv({ isShown: false, type: "Add New", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
