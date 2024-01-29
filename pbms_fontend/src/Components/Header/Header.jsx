import React, { useState } from "react";
import "./Header.css";
import {
  BsFillGrid3X3GapFill,
  BsPersonCircle,
  BsFillGearFill,
} from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="Header">
      <div className="Menu" onClick={toggleSidebar}>
        <BsFillGrid3X3GapFill />
      </div>
      <div className="User_Setting">
        <div className="User">
          <BsPersonCircle />
          <span>Tên người dùng</span>
        </div>
        <div className="Setting">
          <BsFillGearFill onClick={handleDropdownToggle} />
          <Dropdown align={{ lg: "end" }} show={dropdownOpen} onHide={() => setDropdownOpen(false)}>
            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
