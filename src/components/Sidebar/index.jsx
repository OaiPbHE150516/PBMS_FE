import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { sidebars } from "../../contexts/sidebars";
import { BsList } from "react-icons/bs";

const Sidebar = ({ isIconsMode }) => {
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

  const renderSidebarIcons = () => {
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
          </Link>
        </li>
      );
    });
  };
  return (
    <>
      {/* ======= Sidebar ======= */}
      {isIconsMode ? (
        <aside id="sidebar" className={`sidebar`}>
          <ul className="listSidebar sidebar-nav" id="sidebar-nav">
            {renderSidebars()}
          </ul>
        </aside>
      ) : (
        <aside id="sidebarIcons" className={`sidebar`}>
          <ul className="listSidebar sidebar-nav" id="sidebar-nav">
            {renderSidebarIcons()}
          </ul>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
