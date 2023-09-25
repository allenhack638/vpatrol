import Navbar from "../Navbar/Navbar";
import "./Calendar.css";
import WeekTable from "../WeekTable/Weektable";
function Calendar() {
  return (
    <div className="App">
      <Navbar />
      <WeekTable />
    </div>
  );
}

export default Calendar;
