import React from "react";
import Navbar from "../components/Navbar.jsx";
import Searchbar from "../components/Searchbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { MdTag } from "react-icons/md";

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

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {data.map((item) => (
          <div key={item.id} className="mb-4">
            <NoteCard data={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
