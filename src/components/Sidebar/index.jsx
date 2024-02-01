import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { sidebars } from "../../contexts/sidebars";

const Sidebar = ({ isOpen }) => {
  const [selected, setSelected] = useState(0);

  const renderSidebars = () => {
    return sidebars.map((item, index) => {
      return (
        <li
          key={index}
          className={"nav-item "}
          onClick={() => setSelected(index)}
        >
          <Link
            className={selected === index ? "content active " : "content"}
            to={item.path}
          >
            {item.icon}
            <span className="nav-link-text ms-2">{item.text}</span>
          </Link>
        </li>
      );
    });
  };
  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="listSidebar sidebar-nav" id="sidebar-nav">
          {renderSidebars()}
        </ul>
      </aside>
      {/* End Sidebar*/}
    </>
  );
};

export default Sidebar;
