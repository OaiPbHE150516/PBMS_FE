import React, { useRef, useState, useEffect } from "react";
import { PageTitle } from "../../components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../css/Calendar.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { getCalendars } from "../../redux/calendarSlice";
import dayjs from "dayjs";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  const events = useAppSelector((state) => state.calendar.values);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCalendars({ month: 3, year: 2024 }));
  }, []);

  const handleEventClick = (info) => {
    const clickedDateEvents = events.find((event) => {
      const eventDate = event.date.substring(0, 10);
      const clickedDate = info.event.startStr.substring(0, 10);
      return eventDate === clickedDate;
    });
    if (clickedDateEvents && clickedDateEvents.transactions) {
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
      if (clickedDateEvents && clickedDateEvents.transactions) {
        setDisplayedTransactions(clickedDateEvents.transactions);
      } else {
        setDisplayedTransactions([]);
      }
    }
  }, [selectedDate, events]);

  return (
    <div className="Calendar">
      <PageTitle title="Calendar" />
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-4 listTrans card">
            <div className="card-body">
              <h5 className="card-title">Calendar</h5>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Category</th>
                    <th scope="col">Wallet</th>
                    <th scope="col">Money</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedTransactions.length > 0 ? (
                    displayedTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{dayjs(transaction.transactionDate).format("DD/MM/YYYY")}</td>
                        <td>{transaction.category.nameVN}</td>
                        <td>{transaction.wallet.name}</td>
                        <td className={transaction.totalAmount > 0 ? "green" : "red"}>
                          {transaction.totalAmount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-7 fullCalendar card">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
              eventContent={(arg) => (
                <>
                  <div>
                    {arg.event.extendedProps.totalAmount > 0 ? (
                      <div className="green">
                        <IoMdArrowDropup />
                        {arg.event.extendedProps.totalAmount}
                      </div>
                    ) : (
                      <div className="red">
                        <IoMdArrowDropdown />
                        {arg.event.extendedProps.totalAmount}
                      </div>
                    )}
                  </div>
                </>
              )}
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
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
