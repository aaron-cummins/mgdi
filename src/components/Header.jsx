import React from "react";

const Header = (props) => (
  <div className=" mb-5">
    <span className="text-lg text-gray-400">{props.category}</span>

    <div className="flex justify-between items-center gap-2 mb-3">
      <span className="text-3xl font-extrabold tracking-tight text-slate-900">{props.title}</span>
      <span>{props.children}</span>
    </div>
  </div>
);

export default Header;
