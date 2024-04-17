import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({ data, onEdit, onDelete, onPinNote }) => {
  const { title, content, tags, isPinned } = data;
  return (
    <div className="bg-slate-100 rounded-lg shadow-md hover:shadow-lg p-4 mb-1 hover:z-10 min-w-min ease-in-out">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <h6 className="text-2xl font-semibold text-black">{title}</h6>
          <div className="gap-3 flex ">
            {/* <span className="text-xs text-gray-500">
              Created At : {moment(data.createdAt).fromNow()}
            </span> */}
            <span className="text-xs text-gray-500">
              Created: {moment(data.updatedAt).fromNow()}
            </span>
          </div>
        </div>
        <MdOutlinePushPin
          className={`text-xl icon-btn ${
            isPinned ? "text-blue-500" : "text-gray-400"
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-gray-600">{content?.slice(0, 60)}</p>
      <div className="flex justify-between mt-2">
        <div className="text-sm text-blue-400 flex gap-2">
          {tags.map((tag, index) => {
            if (index === tags.length - 1)
              return <h2 key={index}>{`#${tag} `}</h2>;
            else return <h2 key={index}>{`#${tag}, `}</h2>;
          })}
        </div>
        <div className="flex justify-around items-center text-lg gap-4">
          <MdCreate
            className="icon-btn hover:hover:text-blue-600 hover:text-xl"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:hover:text-blue-600 hover:text-xl"
            onClick={onDelete}
          />
          {/* <MdEdit className='icon-btn hover:hover:text-blue-600 hover:text-xl' onClick={onEdit}/> */}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
