import { createContext, useState, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const today = new Date();
  const daysUntilSunday = 7 - today.getDay();
  today.setDate(today.getDate() + daysUntilSunday - 7);

  const ACTIONS = {
    EDIT_EVENT: "edit-event",
    DELETE_EVENT: "delete-event",
    ADD_EVENT: "add-event",
    EDIT_EVENT: "edit-event",
  };

  const events = [
    {
      id: 1,
      name: "Meeting",
      startTime: "8:30",
      endTime: "9:30",
      color: "#FF5733",
      date: "9/24/2023",
    },
    {
      id: 2,
      name: "Workshop",
      startTime: "9:30",
      endTime: "10:30",
      color: "#3498db",
      date: "9/25/2023",
    },
    {
      id: 3,
      name: "Conference Call",
      startTime: "10:30",
      endTime: "11:30",
      color: "#e74c3c",
      date: "9/26/2023",
    },
    {
      id: 4,
      name: "Presentation",
      startTime: "11:30",
      endTime: "12:30",
      color: "#27ae60",
      date: "9/27/2023",
    },
    {
      id: 5,
      name: "Team Lunch",
      startTime: "12:30",
      endTime: "13:30",
      color: "#f39c12",
      date: "9/28/2023",
    },
    {
      id: 6,
      name: "Product Demo",
      startTime: "13:30",
      endTime: "14:30",
      color: "#9b59b6",
      date: "9/29/2023",
    },
    {
      id: 7,
      name: "Interview",
      startTime: "14:30",
      endTime: "15:30",
      color: "#34495e",
      date: "9/30/2023",
    },
    {
      id: 8,
      name: "Training Session",
      startTime: "15:30",
      endTime: "16:30",
      color: "#c0392b",
      date: "10/1/2023",
    },
    {
      id: 9,
      name: "Project Meeting",
      startTime: "16:30",
      endTime: "17:30",
      color: "#3498db",
      date: "10/2/2023",
    },
    {
      id: 10,
      name: "Webinar",
      startTime: "17:30",
      endTime: "18:30",
      color: "#d35400",
      date: "10/3/2023",
    },
    {
      id: 11,
      name: "Client Meeting",
      startTime: "18:30",
      endTime: "19:30",
      color: "#27ae60",
      date: "10/4/2023",
    },
    {
      id: 12,
      name: "Team Building",
      startTime: "19:30",
      endTime: "20:30",
      color: "#f1c40f",
      date: "10/5/2023",
    },
    {
      id: 13,
      name: "Product Launch",
      startTime: "13:30",
      endTime: "14:30",
      color: "#9b59b6",
      date: "10/6/2023",
    },
    {
      id: 14,
      name: "Design Review",
      startTime: "14:30",
      endTime: "15:30",
      color: "#34495e",
      date: "10/7/2023",
    },
    {
      id: 15,
      name: "Code Debugging",
      startTime: "15:30",
      endTime: "16:30",
      color: "#c0392b",
      date: "10/8/2023",
    },
    {
      id: 16,
      name: "Team Meeting",
      startTime: "16:30",
      endTime: "17:30",
      color: "#3498db",
      date: "10/9/2023",
    },
  ];

  function reducerFunction(state, action) {
    switch (action.type) {
      case ACTIONS.DELETE_EVENT:
        return state.filter((event) => event.id !== action.payload);
      case ACTIONS.ADD_EVENT:
        return [...state, { ...action.payload, id: uuidv4() }];
      case ACTIONS.EDIT_EVENT:
        return state.map((event) =>
          event.id === action.payload.id
            ? { ...event, ...action.payload.updatedEvent }
            : event
        );
      default:
        return events;
    }
  }

  const [CurrentDate, setCurrentDate] = useState(today);
  const [CurrentEvents, setCurrentEvents] = useState(
    Array(13)
      .fill(null)
      .map(() => Array(7).fill(null))
  );
  const [GlobalEvents, dispatch] = useReducer(reducerFunction, events);

  return (
    <GlobalContext.Provider
      value={{
        CurrentDate,
        setCurrentDate,
        GlobalEvents,
        ACTIONS,
        // setGlobalEvents,
        CurrentEvents,
        setCurrentEvents,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalState = () => {
  return useContext(GlobalContext);
};
export default GlobalContextProvider;
