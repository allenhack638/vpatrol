import React, { useState } from "react";
import "./WeekTable.css";

import Modal from "../Modal/Modal";
import TodayEvent from "../Modal/TodayEvent";

import { GlobalState } from "../Context/ContextProvider";
import {
  calculatetime,
  truncateText,
  CalculateDate,
  calculateTime12hrsFromIndex,
} from "../Functions/AllFunctions";

function WeekTable() {
  const { state } = GlobalState();
  console.log(state);
  const indexArray = [false, false, false, false, false, false, false];

  const [ShowModal, setShowModal] = useState(false);
  const [ClickedDate, setClickedDate] = useState();
  const [ShowEditModal, setShowEditModal] = useState(false);

  state.currEvents?.forEach((events) => {
    events?.forEach((event) => {
      const eventDate = new Date(event?.date);
      const dayOfWeek = eventDate?.getDay();
      indexArray[dayOfWeek] = true;
    });
  });

  const addEventButton = (dayIndex) => {
    setClickedDate(dayIndex);
    setShowModal(true);
  };
  const onTodayEventHandler = (dayIndex) => {
    setClickedDate(dayIndex);
    setShowEditModal(true);
  };
  return (
    <>
      {ShowModal && (
        <Modal onClose={() => setShowModal(false)} dayIndex={ClickedDate} />
      )}

      {ShowEditModal && (
        <TodayEvent
          onClose={() => setShowEditModal(false)}
          dayIndex={ClickedDate}
        />
      )}
      <div>
        <table className="calender-table">
          <thead>
            <tr className="row">
              <th></th>
              {indexArray.map((eventIsPresent, index) => {
                return (
                  <th key={index} className="week-styles">
                    <div>
                      <p>{CalculateDate(index).day}</p>
                      <p>{CalculateDate(index).weekday}</p>
                      {eventIsPresent && <p className="badge"></p>}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {
              <tr className="row second">
                <th></th>
                {indexArray.map((eventIsPresent, index) => (
                  <th className="second-section" key={index}>
                    <div className="button-box">
                      <p
                        className="clickable"
                        onClick={() => addEventButton(index)}
                      >
                        Add an event
                      </p>
                      {eventIsPresent && (
                        <p
                          className="clickable onTodayEvent"
                          onClick={() => onTodayEventHandler(index)}
                        >
                          Today's events
                        </p>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            }
            {Array.from({ length: 13 }, (_, timeIndex) => {
              const startTime = calculateTime12hrsFromIndex(timeIndex);
              return (
                <tr className="row second" key={timeIndex}>
                  <td>
                    <p className="time">{startTime}</p>
                  </td>
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const event = state.currEvents[dayIndex][timeIndex];
                    return (
                      <td className="second-section" key={dayIndex}>
                        <div className="outer-div">
                          {event && (
                            <div
                              style={{ backgroundColor: event.color }}
                              className="event-th"
                            >
                              <p className="event-name">
                                {event?.name
                                  ? `${truncateText(event?.name, 35)}`
                                  : ""}
                              </p>
                              <p className="event-time">
                                {`${
                                  calculatetime(event.startTime).starttime
                                } - ${calculatetime(event.startTime).endTime} ${
                                  calculatetime(event.startTime).isNoonEnd
                                }`}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WeekTable;
