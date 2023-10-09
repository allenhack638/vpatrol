import React, { useState } from "react";
import { GlobalState } from "../Context/ContextProvider";
import { LatestSunday, options } from "../Functions/AllFunctions";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";

function CustomCalendar({ onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const { CurrentDate, setCurrentDate, GlobalEvents } = GlobalState();

  return (
    <div className="modal">
      <div className="custom-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <Calendar
          onChange={(val) => {
            setSelectedDate(new Date(val));
          }}
          value={new Date(CurrentDate)}
          className="react-calendar-style"
          tileContent={({ date }) => {
            const hasEvent = GlobalEvents.some((event) => {
              const eventDate = new Date(event.date).toLocaleDateString();
              return eventDate === date.toLocaleDateString();
            });
            if (hasEvent) {
              return <div className="dateBadge"></div>;
            }
            return null;
          }}
        />
        <h2 className="custom-calendar-header">
          Current Date:- {CurrentDate?.toLocaleDateString("en-US", options)}
        </h2>
        {selectedDate && (
          <h2 className="custom-calendar-header">
            Go to Date:-{" "}
            {new Date(selectedDate)?.toLocaleDateString("en-US", options)}
          </h2>
        )}

        {selectedDate && (
          <div className="custom-calendar-button-div">
            <div className="go-to-date">
              <button
                className="go-button"
                onClick={() => {
                  setCurrentDate(LatestSunday(new Date(selectedDate)));
                  onClose();
                }}
              >
                Go
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomCalendar;
