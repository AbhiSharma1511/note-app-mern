import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import TagList from "../components/TagList"

const AddEditNotes = ({ addBtnClicked }) => {
  const { isShown, type, data } = addBtnClicked;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Tags:", tags);
    setTitle("");
    setContent("");
    setTags("");
  };

  return (
    isShown && (
      <div
        id="mainDiv"
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <div className="sm:w-96 w-64 bg-slate-200 rounded-lg shadow-md hover:shadow-lg p-4 absolute">
          <h1 className="text-2xl mb-4 font-semibold">{type} Note</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
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
                Content
              </label>
              <textarea
                className="mt-1 p-2 w-full sm:h-24 h-14 border rounded-md"
                placeholder="Enter content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <TagList/>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="text"
                  className="mt-1 p-2 flex border rounded-md"
                  placeholder="Add tag..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <button type="button" >
                  <MdAdd className="text-2xl hover:text-blue-600 hover:text-3xl" />
                </button>
              </div>
            </div>
            <div className="flex justify-around">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Note
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddEditNotes;
