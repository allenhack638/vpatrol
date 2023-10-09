import React, { useState } from "react";
import "./Modal.css";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";

import {
  CalculateDate,
  predefinedColors,
  convertTo24Hour,
  startTimes,
} from "../Functions/AllFunctions";
import { GlobalState } from "../Context/ContextProvider";

function Modal({ onClose, dayIndex }) {

  const { dispatch, ACTIONS, CurrentEvents } = GlobalState();
  const [selectedColor, setSelectedColor] = useState("#ffd6c4");
  const { day, weekday, year, oriDate } = CalculateDate(dayIndex);
  
  const initialValues = {
    eventName: "",
    newStart: "",
    newEnd: "",
  };
  const validateOverlap = (values) => {
    const errors = {};

    if (values.newStart === "") {
      errors.newStart = "Start time is required";
    }
    if (values.newEnd === "") {
      errors.newEnd = "End time is required";
    }
    if (convertTo24Hour(values?.newStart) > convertTo24Hour(values?.newEnd)) {
      errors.newEnd = "End time must be greater than Start time";
    }
    // ["8:30am - 9:30am","9:30am-10:30am1",""]
    if (values.newStart && values.newEnd) {
      const { newStart, newEnd } = values;
      const startHour = Number(convertTo24Hour(newStart).split(":")[0]) - 8;
      const endHour = Number(convertTo24Hour(newEnd).split(":")[0]) - 8;

      for (let hour = startHour; hour < endHour; hour++) {
        if (CurrentEvents[dayIndex][hour]) {
          errors.newEnd = "Overlapping Time Selection";
          break;
        }
      }
    }

    if (!values.eventName) {
      errors.eventName = "Event name is required";
    }
    return errors;
  };

  function handleSubmit(values) {
    const id = uuidv4();
    const name = values?.eventName;
    const startTime = convertTo24Hour(values?.newStart);
    const endTime = convertTo24Hour(values?.newEnd);
    const color = selectedColor;
    const date = oriDate && oriDate;
    let durationInHours = endTime.split(":")[0] - startTime.split(":")[0];

    if (durationInHours <= 1) {
      dispatch({
        type: ACTIONS.ADD_EVENT,
        payload: {
          id,
          name,
          startTime,
          endTime,
          color,
          date,
        },
      });
    } else {
      const slots = [];
      let currentStartTime = startTime;
      let isFirstSlot = true;

      while (durationInHours >= 1) {
        const currentEndTime = Number(currentStartTime.split(":")[0]) + 1;

        const slot = {
          id,
          startTime: currentStartTime,
          endTime: `${currentEndTime}:30`,
          color,
          date,
        };
        if (isFirstSlot) {
          slot.name = name;
          isFirstSlot = false;
        }

        slots.push(slot);

        currentStartTime = `${currentEndTime}:30`;
        durationInHours -= 1;
      }

      slots.forEach((slot) => {
        dispatch({
          type: ACTIONS.ADD_EVENT,
          payload: slot,
        });
      });
    }
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Create Event</h2>
        <p className="modal-date">{`${day && day}, ${weekday && weekday} ${
          year && year
        }`}</p>

        <Formik
          initialValues={initialValues}
          validate={validateOverlap}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => {
            let FilteredEndTime = startTimes;
            if (values?.newStart) {
              FilteredEndTime = startTimes.filter((time) => {
                return (
                  convertTo24Hour(time) > convertTo24Hour(values?.newStart)
                );
              });
            }
            return (
              <Form>
                <label htmlFor="newStart">Start Time:</label>
                <select
                  id="newStart"
                  onChange={handleChange}
                  value={values.newStart}
                  name="newStart"
                >
                  <option value={""}> Select a start time</option>
                  {startTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                {errors.newStart && (
                  <p className="error-message">{errors.newStart}</p>
                )}

                <label htmlFor="newEnd">End Time:</label>
                <select
                  id="newEnd"
                  onChange={handleChange}
                  value={values.newEnd}
                  name="newEnd"
                  disabled={values.newStart === ""}
                >
                  <option value={""}> Select a end time</option>
                  {FilteredEndTime.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                {errors.newEnd && (
                  <p className="error-message">{errors.newEnd}</p>
                )}

                <label htmlFor="eventName">Event Name:</label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={values.eventName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. meeting with CEO"
                />
                {errors.eventName && touched.eventName && (
                  <p className="error-message">{errors.eventName}</p>
                )}

                <label htmlFor="eventColor">Set a Background Color:</label>
                <div className="color-options">
                  {predefinedColors.map((color) => (
                    <label key={color} className="color-label">
                      <input
                        type="radio"
                        value={color}
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(color)}
                      />
                      <span
                        className="color-box"
                        style={{ backgroundColor: color }}
                      ></span>
                    </label>
                  ))}
                </div>
                <button type="submit" className="add-button">
                  Add Event
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Modal;
