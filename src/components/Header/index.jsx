import React, { useState } from "react";
import "./Header.css";
import { BsPersonCircle, BsFillGearFill, BsList } from "react-icons/bs";

import Logo from "../../assets/Logo.png";
import { Notification, Profile, Searchbar } from "../../components";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/authenSlice";

const AuthenticatedHeader = () => {
  return (
    <>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown">
            <Notification />
          </li>
          {/* End Notification Nav */}

          <li className="nav-item dropdown pe-3">
            <Profile />
          </li>
          {/* End Profile Nav */}
        </ul>
      </nav>
    </>
  );
};

const Header = ({ onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const disptach = useDispatch();

  const user = useSelector((state) => state.authen.user);
  console.log(user);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <header id="header" className="header fixed-top d-flex">
        <div
          className="d-flex align-items-center justify-content-between"
          onClick={onToggleSidebar}
        >
          <a href="index.html" className="logo d-flex align-items-center">
            <img src={Logo} alt="" />
            <span>PBMS</span>
          </a>

          <BsList className="toggle-sidebar-btn" />
        </div>
        {/* End Logo */}

        <div className="User_Setting">
          <div className="User">
            <BsPersonCircle />
            {user !== null ? (
              <AuthenticatedHeader />
            ) : (
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  disptach(signin(credentialResponse.credential));
                  console.log("ok: ", credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            )}
          </div>
          <div className="Setting">
            <BsFillGearFill />
          </div>
        </div>
      </header>
      {/* End Header */}
    </>
  );

  // return (
  //   <div className="Header">
  //     <div className="Menu" onClick={toggleSidebar}>
  //       <BsFillGrid3X3GapFill />
  //     </div>
  //     <div className="User_Setting">
  //       <div className="User">
  //         <BsPersonCircle />
  //         <span>Tên người dùng</span>
  //       </div>
  //       <div className="Setting">
  //         <BsFillGearFill onClick={handleDropdownToggle} />
  //         <Dropdown align={{ lg: "end" }} show={dropdownOpen} onHide={() => setDropdownOpen(false)}>
  //           <Dropdown.Menu>
  //             <Dropdown.Item>Action</Dropdown.Item>
  //             <Dropdown.Item>Another action</Dropdown.Item>
  //             <Dropdown.Item>Something else</Dropdown.Item>
  //           </Dropdown.Menu>
  //         </Dropdown>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Header;
