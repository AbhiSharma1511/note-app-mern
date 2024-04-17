import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast.jsx";
import EmptyCard from "../components/EmptyCard.jsx";

Modal.setAppElement("#root");

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState([]);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [addItemDiv, setAddItemDiv] = useState({
    isShown: false,
    type: "",
    data: null,
  });
  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (noteDetails) => {
    setAddItemDiv({ isShown: true, type: "Edit", data: noteDetails });
  };

  const handleDelete = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(
        `/delete-note/noteId?id=${noteId}`
      );
      if (response.data && !response.data.error) {
        showToastMessage("Note deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  // search for note
  const onSearchNotes = async (query) => {
    // console.log(query);
    try {
      const response = await axiosInstance.get(
        `/search-notes/query?search=${query}`
      );
      if (response.data && response.data.matchNotes) {
        setIsSearch(true);
        setAllNotes(response.data.matchNotes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = async () => {
    setIsSearch(false);
    getAllNotes();
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
  const handlePinned = async (data) => {
    const noteId = data._id;
    const isPinned = !data.isPinned;
    try {
      const response = await axiosInstance.put(
        `/update-note-isPinned/noteId?id=${noteId}`,
        {isPinned}
      );
      if (response.data && response.data.note) {
        console.log(response.data.note.isPinned);
        showToastMessage("Note Update Successfully");
        getAllNotes();
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

  const handleCloseToast = () => {
    setToast({ isShown: false, message: "" });
  };
  const showToastMessage = (message, type) => {
    setToast({ isShown: true, message, type });
  };

  return (
    <>
      <Navbar
        user={userInfo}
        onSearchNotes={onSearchNotes}
        handleClearSearch={handleClearSearch}
      />
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
                  onDelete={() => handleDelete(item)}
                  onPinNote={() => {
                    handlePinned(item);
                  }}
                />
              </div>
            ))
          ) : (
            <EmptyCard isSearch={isSearch} />
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
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={toast && toast.isShown}
        message={toast && toast.message}
        type={toast && toast.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
