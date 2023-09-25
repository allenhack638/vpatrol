import React, { useState } from "react";
import "./WeekTable.css";

import Modal from "../Modal/Modal";
import EditModal from "../Modal/EditModal";
import DeleteModal from "../Modal/DeleteModal";

import { GlobalState } from "../Context/ContextProvider";
import {
  calculatetime,
  truncateText,
  CalculateDate,
  calculateTime12hrsFromIndex,
} from "../Functions/AllFunctions";

function WeekTable() {
  const { CurrentEvents } = GlobalState();

  const [ShowModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [ClickedDate, setClickedDate] = useState();

  const [ShowEditModal, setShowEditModal] = useState(false);
  const [Event, setEvent] = useState(null);

  const [ShowDeleteModal, setShowDeleteModal] = useState(false);

  const indexArray = [false, false, false, false, false, false, false];
  CurrentEvents?.forEach((events) => {
    events?.forEach((event) => {
      const eventDate = new Date(event?.date);
      const dayOfWeek = eventDate?.getDay();
      indexArray[dayOfWeek] = true;
    });
  });
  console.log(indexArray);

  const addEventButton = (timeIndex, dayIndex) => {
    setStartTime(`${timeIndex + 8}:30`);
    setClickedDate(dayIndex);
    setShowModal(true);
  };

  const onDeleteHandler = (event) => {
    setEvent(event);
    setShowDeleteModal(true);
  };

  return (
    <>
      {ShowModal && (
        <Modal
          onClose={() => setShowModal(false)}
          dayIndex={ClickedDate}
          startTime={startTime}
        />
      )}
      {ShowEditModal && (
        <EditModal onClose={() => setShowEditModal(false)} event={Event} />
      )}
      {ShowDeleteModal && (
        <DeleteModal onClose={() => setShowDeleteModal(false)} event={Event} />
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
                {indexArray.map((__, index) => (
                  <th className="second-section" key={index}></th>
                ))}
              </tr>
            }
            {CurrentEvents.map((eventsByTime, timeIndex) => {
              const startTime = calculateTime12hrsFromIndex(timeIndex);
              return (
                <tr className="row second" key={timeIndex}>
                  <th>
                    <p className="time">{startTime}</p>
                  </th>
                  {eventsByTime.map((event, dayIndex) => (
                    <th className="second-section" key={dayIndex}>
                      <div className="outer-div">
                        {event ? (
                          <div
                            style={{ backgroundColor: event.color }}
                            className="event-th"
                          >
                            <div className="buttons-div">
                              <button
                                className="delete-button"
                                onClick={() => onDeleteHandler(event)}
                              >
                                <i className="fa fa-solid fa-trash"></i>
                              </button>
                              <button
                                className="edit-button"
                                onClick={() => {
                                  setShowEditModal(true);
                                  setEvent(event);
                                }}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                            </div>
                            <p className="event-name">
                              {truncateText(event?.name, 40)}..
                            </p>
                            <p className="event-time">
                              {`${calculatetime(event.startTime).starttime} - ${
                                calculatetime(event.startTime).endTime
                              } ${calculatetime(event.startTime).isNoonEnd}`}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="clickable"
                            onClick={() => addEventButton(timeIndex, dayIndex)}
                          >
                            <span>Add an event</span>
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
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
