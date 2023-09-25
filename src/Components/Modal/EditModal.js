import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { GlobalState } from "../Context/ContextProvider";
import { calculatetime, predefinedColors } from "../Functions/AllFunctions";

function EditModal({ event, onClose }) {
  const { dispatch, ACTIONS } = GlobalState();
  const [selectedColor, setSelectedColor] = useState(event?.color);

  const { starttime, isNoonStart, endTime, isNoonEnd } = calculatetime(
    event?.startTime
  );
  
  function handleSubmit(values) {
    dispatch({
      type: ACTIONS.EDIT_EVENT,
      payload: {
        id: event?.id,
        updatedEvent: {
          name: values?.eventName,
          color: selectedColor,
        },
      },
    });
    onClose();
  }
  const initialValues = {
    eventName: `${event.name}`,
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
        <h2>Edit this event</h2>
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
                <button type="submit">Save</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default EditModal;
