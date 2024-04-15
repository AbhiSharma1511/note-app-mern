import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete, MdEdit } from 'react-icons/md';

const NoteCard = ({data}) => {
    const { title, date, content, tags, isPinned, onEdit, onDelete, onPinNote } = data
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-4 mb-4 min-w-min ease-in-out">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <h6 className="text-lg font-semibold text-gray-800">{data.title}</h6>
          <span className="text-xs text-gray-500">{data.date}</span>
        </div>
        <MdOutlinePushPin 
          className={`text-xl icon-btn ${isPinned ? 'text-blue-500' : 'text-gray-400'}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-gray-600">{data.content?.slice(0, 60)}</p>
      <div className='flex justify-between'>
        <div className='text-sm text-slate-500'>{tags}</div>
        <div className='flex justify-around items-center text-lg gap-4'>
            <MdCreate className='icon-btn hover:hover:text-blue-600 hover:text-xl' onClick={onEdit}/>
            <MdDelete className='icon-btn hover:hover:text-blue-600 hover:text-xl' onClick={onDelete}/>
            <MdEdit className='icon-btn hover:hover:text-blue-600 hover:text-xl' onClick={onEdit}/>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
