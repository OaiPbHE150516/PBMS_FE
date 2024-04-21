import React, { useRef, useState, useEffect } from "react";
import { PageHelper, PageTitle } from "../../components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../css/Calendar.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { getCalendars } from "../../redux/calendarSlice";
import viLocale from "@fullcalendar/core/locales/vi";
import { Link } from "react-router-dom";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const user = useAppSelector((state) => state.authen.user);
  const events = useAppSelector((state) => state.calendar.values);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCalendars({ month: currentMonth, year: currentYear }));
  }, [currentMonth, currentYear, user]);

  const handleEventClick = (info) => {
    const clickedDateEvents = events.find((event) => {
      const eventDate = event.date.substring(0, 10);
      const clickedDate = info.event.startStr.substring(0, 10);
      return eventDate === clickedDate;
    });
    if (clickedDateEvents && clickedDateEvents.transactions.length > 0) {
      setDisplayedTransactions(clickedDateEvents.transactions);
    } else {
      setDisplayedTransactions([]);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const clickedDateEvents = events.find(
        (event) => event.date === selectedDate
      );
      if (clickedDateEvents && clickedDateEvents.transactions.length > 0) {
        setDisplayedTransactions(clickedDateEvents.transactions);
      } else {
        setDisplayedTransactions([]);
      }
    }
  }, [selectedDate, events]);

  return (
    <div className="Calendar">
      {user ? (
        <>
          <PageTitle title="Lịch" />
          <section className="section dashboard">
            <div className="row">
              <div className="col-md-4 listTrans card">
                <div className="card-body">
                  <Link to="/transaction">
                    <h5 className="card-title">Các giao dịch</h5>
                  </Link>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Danh mục</th>
                        <th scope="col">Ví</th>
                        <th scope="col">Số tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedTransactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.transactionDateMinus}</td>
                          <td>{transaction.category.nameVN}</td>
                          <td>{transaction.wallet.name}</td>
                          <td
                            className={
                              transaction.category.categoryTypeID === 1
                                ? "green"
                                : "red"
                            }
                          >
                            {transaction.category.categoryTypeID !== 1
                              ? "-"
                              : "+"}
                            {transaction.totalAmount.toLocaleString("vi-VN")} đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-7 fullCalendar card">
                <FullCalendar
                  className="custom-calendar"
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  eventClick={handleEventClick}
                  eventContent={(arg) => (
                    <>
                      <div>
                        {arg.event.extendedProps.totalAmount > 0 ? (
                          <>
                            {" "}
                            <div className="green">
                              <IoMdArrowDropup />
                              {arg.event.extendedProps.totalAmount.toLocaleString(
                                "vi-VN"
                              )}{" "}
                              đ
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="red">
                              <IoMdArrowDropdown />
                              {arg.event.extendedProps.totalAmount.toLocaleString(
                                "vi-VN"
                              )}{" "}
                              đ
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}
                  headerToolbar={{
                    start: "prev",
                    center: "title",
                    end: "next",
                  }}
                  dayCellDidMount={(arg) => {
                    const cellDate =
                      arg.date.getFullYear() +
                      "-" +
                      (arg.date.getMonth() + 1).toString().padStart(2, "0") +
                      "-" +
                      arg.date.getDate().toString().padStart(2, "0");
                    arg.el.setAttribute("data-date", cellDate);
                    arg.el.addEventListener("click", () => {
                      const selectedDate = arg.el.getAttribute("data-date");
                      setSelectedDate(selectedDate);
                    });
                  }}
                  datesSet={(info) => {
                    setCurrentMonth(info.view.currentStart.getMonth() + 1);
                    setCurrentYear(info.view.currentStart.getFullYear());
                  }}
                  locale={viLocale}
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <PageHelper />
        </>
      )}
    </div>
  );
};

export default Calendar;
