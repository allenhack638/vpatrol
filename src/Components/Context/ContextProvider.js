import { createContext, useState, useContext, useReducer } from "react";
import { LatestSunday } from "../Functions/AllFunctions";
import { v4 as uuidv4 } from "uuid";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const ACTIONS = {
    EDIT_EVENT: "edit-event",
    DELETE_EVENT: "delete-event",
    ADD_EVENT: "add-event",
    EDIT_EVENT: "edit-event",
  };

  const events = [];

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

  const [CurrentDate, setCurrentDate] = useState(LatestSunday);
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
