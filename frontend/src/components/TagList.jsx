import React from "react";

const TagList = ({ tags }) => {
  //   const tags = ["meeting", "gym"];
  //   if (tag) {
  //     tags.push(tag);
  //   }
  return (
    <div>
      <div className="flex gap-1">
        {tags.map((tag, index) => {
          if (index === tags.length - 1) return <h2 key={index}>{`#${tag} `}</h2>;
          else return <h2 key={index}>{`#${tag}, `}</h2>;
        })}
      </div>
    </div>
  );
};

export default TagList;
