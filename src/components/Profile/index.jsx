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

const Profile = ({data}) => {

  const dispatch = useDispatch ();
  const {signOut} = authenSlice.actions;

  const handleSignOutClick = () => {
    dispatch(signOut());
    console.log('Signing out...');
  };
  

  return (
    <>
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img src={data.pictureURL} alt="Profile" className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">
          {/* K. Anderson */}
          {data.accountName}
        </span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
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
            to="/setting"
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
