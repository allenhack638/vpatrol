import React, { useState } from "react";
import "./EventDropDown.css";

import { truncateText } from "../Functions/AllFunctions";

export function EventDropdown({ event, onDelete }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="event-container">
      <div className="event-info">
        <button
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className="event-button"
        >
          <p>{`${truncateText(event?.name, 35)}`}</p>
          <p>
            ({event.startTime} - {event.endTime})
          </p>
        </button>
      </div>
      {isDropdownOpen && (
        <div className="edit-delete-buttons">
          <button
            onClick={() => onDelete(event?.id)}
            className="event-button modal-delete-button"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
