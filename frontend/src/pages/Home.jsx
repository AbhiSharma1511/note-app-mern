import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";

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

  const [addItemDiv, setAddItemDiv] = useState({
    isShown: false,
    type: "",
    data: null,
  });

  const addToggleButton = () => {
    setAddItemDiv({ isShown: true, type: "Add New", data: null });
  };
  const editToggleButton = () => {};

  return (
    <>
      <Navbar className="" />
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
        <AddEditNotes addBtnClicked={addItemDiv} />
      </Modal>
    </>
  );
};

export default Home;
