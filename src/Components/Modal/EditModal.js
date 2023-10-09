// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as yup from "yup";

// import { GlobalState } from "../Context/ContextProvider";
// import { calculatetime, predefinedColors } from "../Functions/AllFunctions";

// function EditModal({ event, onClose }) {
//   const { dispatch, ACTIONS } = GlobalState();
//   const [selectedColor, setSelectedColor] = useState(event?.color);

//   const { starttime, isNoonStart, endTime, isNoonEnd } = calculatetime(
//     event?.startTime
//   );

//   function handleSubmit(values) {
//     dispatch({
//       type: ACTIONS.EDIT_EVENT,
//       payload: {
//         id: event?.id,
//         updatedEvent: {
//           name: values?.eventName,
//           color: selectedColor,
//         },
//       },
//     });
//     onClose();
//   }
//   const initialValues = {
//     eventName: `${event.name}`,
//   };
//   const validationSchema = yup.object().shape({
//     eventName: yup.string().required("Event name is required"),
//   });
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <h2>Edit this event</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ errors, touched, values, handleChange, handleBlur }) => {
//             return (
//               <Form>
//                 <label htmlFor="startTime">Start Time:</label>
//                 <input
//                   type="text"
//                   id="startTime"
//                   value={`${starttime} ${isNoonStart}`}
//                   disabled
//                 />

//                 <label htmlFor="endTime">End Time:</label>
//                 <input
//                   type="text"
//                   id="endTime"
//                   value={`${endTime} ${isNoonEnd}`}
//                   disabled
//                 />
//                 <label htmlFor="eventName">Event Name:</label>
//                 <input
//                   type="text"
//                   id="eventName"
//                   name="eventName"
//                   value={values.eventName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {errors.eventName && touched.eventName && (
//                   <p className="error-message">{errors.eventName}</p>
//                 )}

//                 <label htmlFor="eventColor">Set a Background Color</label>
//                 <div className="color-options">
//                   {predefinedColors.map((color) => (
//                     <label key={color} className="color-label">
//                       <input
//                         type="radio"
//                         value={color}
//                         checked={selectedColor === color}
//                         onChange={() => setSelectedColor(color)}
//                       />
//                       <span
//                         className="color-box"
//                         style={{ backgroundColor: color }}
//                       ></span>
//                     </label>
//                   ))}
//                 </div>
//                 <button type="submit">Save</button>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default EditModal;

import { CalculateDate, compareTimes } from "../Functions/AllFunctions";
import { EventDropdown } from "./EventDropdown";
import { GlobalState } from "../Context/ContextProvider";

function EditModal({ onClose, dayIndex }) {
  const { CurrentEvents, ACTIONS, dispatch } = GlobalState();
  const { oriDate } = CalculateDate(dayIndex);

  const uniqueEvents = {};

  CurrentEvents[dayIndex]?.forEach((event) => {
    if (event) {
      const id = event.id;
      if (!uniqueEvents[id]) {
        uniqueEvents[id] = {
          id: event.id,
          name: event.name,
          startTime: event.startTime,
          endTime: event.endTime,
        };
      } else {
        if (compareTimes(event.startTime, uniqueEvents[id].startTime) < 0) {
          uniqueEvents[id].startTime = event.startTime;
        }
        if (compareTimes(event.endTime, uniqueEvents[id].endTime) > 0) {
          uniqueEvents[id].endTime = event.endTime;
        }
      }
    }
  });
  const uniqueEventsArray = Object.values(uniqueEvents);
  uniqueEventsArray.sort((a, b) => compareTimes(a.startTime, b.startTime));

  const handleDeleteEvent = (eventId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (userConfirmed) {
      dispatch({
        type: ACTIONS?.DELETE_EVENT,
        payload: eventId,
      });
      console.log("Item deleted!");
    } else {
      console.log("Delete canceled.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2> Today's events</h2>
        <p className="modal-date">{oriDate}</p>
        <div>
          {uniqueEventsArray?.map(
            (event) =>
              event && (
                <EventDropdown
                  key={event.id}
                  event={event}
                  onDelete={handleDeleteEvent}
                />
              )
          )}
        </div>

        {uniqueEventsArray?.length === 0 && <p className="not-found">No events Found</p>}
      </div>
    </div>
  );
}

export default EditModal;
