import "./Navbar.css";
import { GlobalState } from "../Context/ContextProvider";
import { getFormattedDate } from "../Functions/AllFunctions";
import { useEffect } from "react";
const Navbar = () => {
  const {
    CurrentDate,
    setCurrentDate,
    setCurrentEvents,
    GlobalEvents,
    setGlobalEvents,
  } = GlobalState();

  useEffect(() => {
    const currentDate = new Date(CurrentDate);

    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const eventsWithinWeek = GlobalEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });

    const weekEvents = Array(13)
      .fill(null)
      .map(() => Array(7).fill(null));

    eventsWithinWeek.forEach((event) => {
      const eventDate = new Date(event.date);
      const dayIndex = eventDate.getDay();
      const startTime = event.startTime;
      const [hours] = startTime.split(":").map(Number);
      const timeIndex = hours - 8;
      if (dayIndex >= 0 && dayIndex < 7 && timeIndex >= 0 && timeIndex < 13) {
        weekEvents[timeIndex][dayIndex] = event;
      }
    });
    setCurrentEvents(weekEvents);
  }, [CurrentDate, GlobalEvents, setCurrentEvents, setGlobalEvents]);
  
  const rangeEnd = new Date(CurrentDate);
  rangeEnd.setDate(CurrentDate.getDate() + 6);

  const increaseWeekly = () => {
    const temp = new Date(CurrentDate);
    temp.setDate(CurrentDate.getDate() + 7);
    setCurrentDate(temp);
  };

  const decreaseWeekly = () => {
    const temp = new Date(CurrentDate);
    temp.setDate(CurrentDate.getDate() - 7);
    setCurrentDate(temp);
  };

  return (
    <nav className="navigation">
      <h1 className="left-part">Timeline</h1>

      <div className="right-part">
        <div className="calendar-select">
          <p>&#128197;</p>
          <select name="date-dropdown" id="date-dropdown">
            <option value="week">Week</option>
            <option value="monthy">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="current-range">
          <p>{getFormattedDate(CurrentDate, rangeEnd)}</p>
        </div>

        <div className="navigation-button">
          <button onClick={decreaseWeekly}>
            <p>{"<"}</p>
          </button>
          <button onClick={increaseWeekly}>
            <p>{">"}</p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
