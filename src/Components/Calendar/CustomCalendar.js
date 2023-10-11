import React, { useState } from "react";
import { GlobalState } from "../Context/ContextProvider";
import { LatestSunday, options } from "../Functions/AllFunctions";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";

function CustomCalendar({ onClose }) {
  const { state, dispatch, ACTIONS } = GlobalState();
  const [selectedDate, setSelectedDate] = useState(null);
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
          value={state?.currDate}
          className="react-calendar-style"
          tileContent={({ date }) => {
            const hasEvent = state.globalEvents.some((event) => {
              const eventDate = new Date(event.date).toLocaleDateString();
              return eventDate === date.toLocaleDateString();
            });
            if (hasEvent) {
              return <div className="dateBadge"></div>;
            }
            return <></>;
          }}
        />
        <h2 className="custom-calendar-header">
          Current Date:- {state.currDate?.toLocaleDateString("en-US", options)}
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
                  dispatch({
                    type: ACTIONS.SET_DATE,
                    payload: LatestSunday(new Date(selectedDate)),
                  });
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
