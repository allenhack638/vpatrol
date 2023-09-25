import "./Navbar.css";
import { GlobalState } from "../Context/ContextProvider";
import { getFormattedDate } from "../Functions/AllFunctions";
import { useEffect, useState } from "react";
import CustomCalendar from "../Calendar/CustomCalendar";
import IntroModal from "../IntroModal/IntroModal";
const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("week");
  const [ShowIntroModal, setShowIntroModal] = useState(false);
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
    <>
      {selectedOption === "monthly" && (
        <CustomCalendar onClose={() => setSelectedOption("week")} />
      )}
      {ShowIntroModal && (
        <IntroModal onClose={() => setShowIntroModal(false)} />
      )}
      <nav className="navigation">
        <div className="left-part">
          <h1>Timeline</h1>
          <button onClick={() => setShowIntroModal(true)}>
            <p>Getting Started</p>
          </button>
        </div>
        <div className="right-part">
          <div className="calendar-select">
            <p>&#128197;</p>
            <select
              name="date-dropdown"
              id="date-dropdown"
              onChange={(e) => setSelectedOption(e.target.value)}
              value={selectedOption}
            >
              <option value="week">Week</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="current-range">
            <p>{`${getFormattedDate(CurrentDate, rangeEnd)}, `}</p>
            <p>{new Date(rangeEnd)?.getFullYear()}</p>
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
    </>
  );
};

export default Navbar;
