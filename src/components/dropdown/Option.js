import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { toggle } = useDropdown();
  const { onClick } = props;
  const handleClick = () => {
    onClick && onClick();
    toggle();
  };
  return (
    <div
      className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
