import { createContext, useState, useContext, useReducer } from "react";
import { LatestSunday } from "../Functions/AllFunctions";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const ACTIONS = {
    DELETE_EVENT: "delete-event",
    ADD_EVENT: "add-event",
  };

  const events = [];

  function reducerFunction(state, action) {
    switch (action.type) {
      case ACTIONS.DELETE_EVENT:
        return state.filter((event) => event.id !== action.payload);
      case ACTIONS.ADD_EVENT: {
        console.log(action.payload);
        return [...state, { ...action.payload }];
      }
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

  const [CurrentDate, setCurrentDate] = useState(LatestSunday);
  const [CurrentEvents, setCurrentEvents] = useState(
    Array(7)
      .fill(null)
      .map(() => Array(13).fill(null))
  );
  const [GlobalEvents, dispatch] = useReducer(reducerFunction, events);

  return (
    <GlobalContext.Provider
      value={{
        CurrentDate,
        setCurrentDate,
        GlobalEvents,
        ACTIONS,
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
