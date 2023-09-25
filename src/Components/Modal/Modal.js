import React, { useState } from "react";
import "./Modal.css";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  calculatetime,
  CalculateDate,
  predefinedColors,
} from "../Functions/AllFunctions";
import { GlobalState } from "../Context/ContextProvider";

function Modal({ startTime, onClose, dayIndex }) {
  const { dispatch, ACTIONS } = GlobalState();
  const [selectedColor, setSelectedColor] = useState("#ffd6c4");

  const { starttime, isNoonStart, endTime, isNoonEnd } =
    calculatetime(startTime);

  const ClickedDate = CalculateDate(dayIndex);

  function handleSubmit(values) {
    dispatch({
      type: ACTIONS.ADD_EVENT,
      payload: {
        name: values?.eventName,
        startTime: startTime,
        color: selectedColor,
        date: ClickedDate?.oriDate,
      },
    });
    onClose();
  }
  const initialValues = {
    eventName: "",
  };
  const validationSchema = yup.object().shape({
    eventName: yup.string().required("Event name is required"),
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Create Event</h2>
        <p className="modal-date">{`${ClickedDate?.day}, ${ClickedDate?.weekday} ${ClickedDate?.year}`}</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => {
            return (
              <Form>
                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="text"
                  id="startTime"
                  value={`${starttime} ${isNoonStart}`}
                  disabled
                />

                <label htmlFor="endTime">End Time:</label>
                <input
                  type="text"
                  id="endTime"
                  value={`${endTime} ${isNoonEnd}`}
                  disabled
                />
                <label htmlFor="eventName">Event Name:</label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={values.eventName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.eventName && touched.eventName && (
                  <p className="error-message">{errors.eventName}</p>
                )}

                <label htmlFor="eventColor">Event Color:</label>
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
