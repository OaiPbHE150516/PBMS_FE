import { Link } from "react-router-dom";
import Avatar from "../../assets/img/profile-img.jpg";

import {
  BsMenuDown,
  BsPerson,
  BsGear,
  BsQuestionCircle,
  BsBell,
} from "react-icons/bs";
import authenSlice from "../../redux/authenSlice";
import { useDispatch } from "react-redux";
import { ROUTE_CONSTANTS } from "../../constants";

const Profile = () => {

  const dispatch = useDispatch ();
  const {setUser} = authenSlice.actions;

  const handleSignOutClick = () => {
    dispatch(setUser(null));
    sessionStorage.removeItem("user");
    // window.location.href = ROUTE_CONSTANTS.OVERVIEW_PAGE;
  };
  

  return (
    <>
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img src={Avatar} alt="Profile" className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">
          K. Anderson
        </span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>Kevin Anderson</h6>
          <span>Web Designer</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link
            className="dropdown-item d-flex align-items-center link"
            to="/profile"
          >
            <BsPerson className="icon" />
            <span>My Profile</span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link
            className="dropdown-item d-flex align-items-center link"
            to="/settings"
          >
            <BsGear className="icon" />
            <span>Account Settings</span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link
            className="dropdown-item d-flex align-items-center link"
            to="/help"
          >
            <BsQuestionCircle className="icon" />
            <span>Need Help?</span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link
            className="dropdown-item d-flex align-items-center link"
            to={ROUTE_CONSTANTS.OVERVIEW_PAGE}
            onClick={handleSignOutClick}
          >
            <BsMenuDown className="icon" />
            <span>Sign Out</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Profile;
