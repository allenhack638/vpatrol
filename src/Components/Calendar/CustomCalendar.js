import React, { useState } from "react";
import { GlobalState } from "../Context/ContextProvider";
import { LatestSunday } from "../Functions/AllFunctions";
import "./CustomCalendar.css";

function CustomCalendar({ onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const { CurrentDate, setCurrentDate } = GlobalState();
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="modal">
      <div className="custom-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="custom-calendar-header">
          Current Date:- {CurrentDate?.toLocaleDateString("en-US", options)}
        </h2>
        {selectedDate && (
          <h2 className="custom-calendar-header">
            Go to Date:-{" "}
            {new Date(selectedDate)?.toLocaleDateString("en-US", options)}
          </h2>
        )}

        <div className="custom-calendar-button-div">
          <div className="go-to-date">
            <label htmlFor="goToDate">Choose a Date:</label>
            <input
              type="date"
              id="goToDate"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button
              onClick={() => {
                setCurrentDate(
                  LatestSunday(new Date(selectedDate && selectedDate))
                );
                onClose();
              }}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomCalendar;
