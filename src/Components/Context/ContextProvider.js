import { createContext, useContext, useReducer } from "react";
import { LatestSunday } from "../Functions/AllFunctions";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const ACTIONS = {
    DELETE_EVENT: "delete-event",
    ADD_EVENT: "add-event",
    SET_DATE: "set-date",
    SET_CURRENT_EVENTS: "set-curr-events",
  };

  function reducerFunction(state, action) {
    switch (action.type) {
      case ACTIONS.DELETE_EVENT:
        return {
          ...state,
          globalEvents: state.globalEvents.filter(
            (event) => event.id !== action.payload
          ),
        };
      case ACTIONS.ADD_EVENT: {
        return {
          ...state,
          globalEvents: [...state.globalEvents, action.payload],
        };
      }
      case ACTIONS.EDIT_EVENT:
        return state.map((event) =>
          event.id === action.payload.id
            ? { ...event, ...action.payload.updatedEvent }
            : event
        );
      case ACTIONS.SET_DATE:
        return { ...state, currDate: action.payload };
      case ACTIONS.SET_CURRENT_EVENTS:
        return { ...state, currEvents: action.payload };
      default:
        return state;
    }
  }

  const initialState = {
    currDate: LatestSunday(),
    currEvents: Array(7)
      .fill(null)
      .map(() => Array(13).fill(null)),
    globalEvents: [],
  };
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  return (
    <GlobalContext.Provider
      value={{
        state,
        ACTIONS,
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
