import "./Navbar.css";
import { GlobalState } from "../Context/ContextProvider";
import { getFormattedDate } from "../Functions/AllFunctions";
import { useEffect, useState } from "react";
import CustomCalendar from "../Calendar/CustomCalendar";
import IntroModal from "../IntroModal/IntroModal";
const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("week");
  const [ShowIntroModal, setShowIntroModal] = useState(false);

  const { state, ACTIONS, dispatch } = GlobalState();

  useEffect(() => {
    const currentDate = state.currDate;
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const eventsWithinWeek = state.globalEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });

    const weekEvents = Array(7)
      .fill(null)
      .map(() => Array(13).fill(null));

    eventsWithinWeek.forEach((event) => {
      const eventDate = new Date(event.date);
      const dayIndex = eventDate.getDay();
      const startTime = event.startTime;
      const [hours] = startTime.split(":").map(Number);
      const timeIndex = hours - 8;
      if (dayIndex >= 0 && dayIndex < 7 && timeIndex >= 0 && timeIndex < 13) {
        weekEvents[dayIndex][timeIndex] = event;
      }
    });
    dispatch({ type: ACTIONS.SET_CURRENT_EVENTS, payload: weekEvents });
  }, [state.currDate, state.globalEvents]);

  const rangeEnd = new Date(state.currDate);
  rangeEnd.setDate(state.currDate.getDate() + 6);

  const increaseWeekly = () => {
    const temp = new Date(state?.currDate);
    temp.setDate(state?.currDate.getDate() + 7);
    dispatch({ type: ACTIONS.SET_DATE, payload: temp });
  };

  const decreaseWeekly = () => {
    const temp = new Date(state?.currDate);
    temp.setDate(state?.currDate.getDate() - 7);
    dispatch({ type: ACTIONS.SET_DATE, payload: temp });
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
            <p>{`${getFormattedDate(state.currDate, rangeEnd)}, `}</p>
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
