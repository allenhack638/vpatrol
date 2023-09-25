import "./Modal.css";
import { GlobalState } from "../Context/ContextProvider";
import { predefinedColors, calculatetime } from "../Functions/AllFunctions";

function DeleteModal({ event, onClose }) {
  const { dispatch, ACTIONS } = GlobalState();

  const { starttime, isNoonStart, endTime, isNoonEnd } = calculatetime(
    event?.startTime
  );
  function handleSubmit() {
    dispatch({
      type: ACTIONS.DELETE_EVENT,
      payload: event?.id,
    });
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Delete this Event</h2>
        <form>
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
            value={event?.name}
            disabled
          />

          <label htmlFor="eventColor">Background Color</label>
          <div className="color-options">
            {predefinedColors.map((color) => (
              <label key={color} className="color-label">
                <input
                  type="radio"
                  value={color}
                  checked={event?.color === color}
                  disabled
                />
                <span
                  className="color-box"
                  style={{ backgroundColor: color }}
                ></span>
              </label>
            ))}
          </div>
          <button type="button" className="modal-delete-button" onClick={handleSubmit} >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteModal;
