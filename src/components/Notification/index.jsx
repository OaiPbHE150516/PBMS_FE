import { BsBell } from "react-icons/bs";

const Notification = () => {
  return (
    <>
      {" "}
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <BsBell />
        <span className="badge bg-primary badge-number">4</span>
      </a>
      {/* End Notification Icon */}
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-header">
          You have 4 new notifications
          <a href="#">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              View all
            </span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li className="notification-item">
          <i className="bi bi-exclamation-circle text-warning"></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>30 min. ago</p>
          </div>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="dropdown-footer">
          <a href="#">Show all notifications</a>
        </li>
      </ul>
      {/* End Notification Dropdown Items */}
    </>
  );
};


export default Notification;