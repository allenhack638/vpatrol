import { Routes, Route } from "react-router-dom";
import Calendar from "./Components/Calendar/Calendar";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
    </Routes>
  );
};

export default App;
