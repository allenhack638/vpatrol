import "./Calendar.css";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import WeekTable from "../WeekTable/Weektable";
import IntroModal from "../IntroModal/IntroModal";
import Footer from "../Footer/Footer";

function Calendar() {
  const [ShowIntroModal, setShowIntroModal] = useState(false);
  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem("introModalShown");
    if (!hasModalBeenShown) {
      localStorage.setItem("introModalShown", "true");
      setShowIntroModal(true);
    }
  }, []);
  return (
    <>
      {ShowIntroModal && (
        <IntroModal onClose={() => setShowIntroModal(false)} />
      )}
      <div className="App">
        <Navbar />
        <WeekTable />
      </div>
      <Footer />
    </>
  );
}

export default Calendar;
