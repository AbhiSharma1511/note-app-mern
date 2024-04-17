import React, { useState } from "react";
import { MdAdd, MdClose, MdRemove } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../utils/axiosInstance";

const AddEditNotes = ({ getAllNotes, addBtnClicked, onClose, showToastMessage }) => {
  const { isShown, type, data } = addBtnClicked;
  // console.log(type);
  // console.log(data?.title);
  // console.log(data?.content);
  const [title, setTitle] = useState(data?.title || "");
  const [content, setContent] = useState(data?.content || "");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(data?.tags || ["meeting"]);
  const [error, setError] = useState();

  const handleAddNoteBtn = () => {
    if (title.trim() && content.trim()) {
      addNewNote();
      onClose();
    } else {
      setError("Fields are required!!!");
    }
  };

  const handleEditNoteBtn = () => {
    // console.log(type);
    if (title.trim() || content.trim()) {
      editNote();
      onClose();
    } else {
      setError("Fields are required!!!");
    }
  };

  const addTag = () => {
    if (tag.trim() !== "") {
      setTags([...tags, tag]);
      setTag("");
    }
  };
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const editNote = async () => {
    const requestData = {
      title,
      content,
      tags,
    };
    try {
      const response = await axiosInstance.put(
        `edit-note/noteId?id=${data._id}`,
        requestData
      );
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        showToastMessage("Note Updated Successfully")
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Set error message from response
      } else {
        setError("Unexpected error happened!!!");
      }
    }
  };

  const addNewNote = async () => {
    const requestData = {
      title,
      content,
      tags,
    };
    try {
      const response = await axiosInstance.post("/add-note", requestData);
      console.log(requestData);
      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Set error message from response
      } else {
        setError("Unexpected error happened!!!");
      }
    }
  };

  return (
    isShown && (
      <div
        id="mainDiv"
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <div className="sm:w-96 w-64 rounded-lg shadow-md hover:shadow-lg p-4 absolute bg-gray-200">
          <div className="flex justify-around text-lg">
            <h1 className="text-2xl mb-4 font-semibold">{type} Note</h1>
            <button className="ml-auto text-red-500" onClick={onClose}>
              <MdClose />
            </button>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                TITLE
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                CONTENT
              </label>
              <textarea
                className="mt-1 p-2 w-full sm:h-24 h-14 border rounded-md"
                placeholder="Enter content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            {/* tag part is handled here */}
            <div className="mb-4 ">
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4">
                  TAGS:
                </label>
                <div className="gap-2 inline-flex flex-wrap">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-md text-black flex items-center px-2 font-semibold  bg-gray-100 rounded-md"
                    >
                      {`#${tag}`}
                      <button type="button" onClick={() => removeTag(tag)}>
                        <IoMdClose className="text-md ml-1" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <input
                  name="tag"
                  type="text"
                  className="mt-1 p-2 flex border rounded-md"
                  placeholder="Add tag..."
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                <button type="button" onClick={addTag}>
                  <MdAdd className="text-2xl hover:text-blue-600" />
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={type == "Add" ? handleAddNoteBtn : handleEditNoteBtn}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {`${type === "Edit" ? "Update" : "Add"} Note`}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEditNotes;
