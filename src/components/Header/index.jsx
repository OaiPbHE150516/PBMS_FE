import React, { useState } from "react";
import "./Header.css";
import { BsList } from "react-icons/bs";

import Logo from "../../assets/Logo.png";
import { Notification, Profile, Searchbar } from "../../components";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/authenSlice";

const AuthenticatedHeader = ({data}) => {
  return (
    <>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown">
            <Notification />
          </li>
          <li className="nav-item dropdown pe-3">
            <Profile data={data}/>
          </li>
        </ul>
      </nav>
    </>
  );
};

const Header = ({ onToggleSidebar }) => {

  const disptach = useDispatch();

  const user = useSelector((state) => state.authen.user);
  console.log(user);

  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <header id="header" className="header fixed-top d-flex">
        <div
          className="d-flex align-items-center justify-content-between"
        >
          <a href="index.html" className="logo d-flex align-items-center">
            <img src={Logo} alt="" />
            <span>PBMS</span>
          </a>

          <BsList className="toggle-sidebar-btn" onClick={onToggleSidebar} />
        </div>

        <div className="User">
          {user !== null ? (
            <AuthenticatedHeader data={user}/>
          ) : (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                disptach(signin(credentialResponse.credential));
                // disptach(signin(user.accountName));
                // console.log("ok: ", credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
