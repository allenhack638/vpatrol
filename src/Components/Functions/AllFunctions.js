import { GlobalState } from "../Context/ContextProvider";

export const CalculateDate = (index) => {
  const { CurrentDate } = GlobalState();
  if (!(CurrentDate instanceof Date)) {
    return "Invalid date input";
  }
  const temp = new Date(CurrentDate);
  temp.setDate(CurrentDate.getDate() + index);
  const options = {
    weekday: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = temp.toLocaleString("en-US", options);
  const [day, weekday, year] = formattedDate.split(" ");
  const [dd, mm, yyyy] = temp.toLocaleDateString().split("/");
  return { day, weekday, year, oriDate: `${mm}/${dd}/${yyyy}` };
};
export function calculateTime12hrsFromIndex(index) {
  const hours = index + 8;
  const period = hours < 12 ? "AM" : "PM";
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:30 ${period}`;
  return formattedTime;
}
export function calculateTime24hrsFromIndex(index) {
  const hours = index + 8;
  return `${hours}:30`;
}

export const predefinedColors = [
  "#ffd6c4",
  "#d7d7f3",
  "#c7ebdc",
  "#e8ebc7",
  "#ebc7d6",
];
export const getFormattedDate = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    return "Invalid date input";
  }
  const options = { day: "numeric", month: "short" };
  const formattedDate1 = date1.toLocaleString("en-US", options);
  const formattedDate2 = date2.toLocaleString("en-US", options);

  return `${formattedDate1} - ${formattedDate2}`;
};
export function getMinutesFromTime(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}
export const calculatetime = (startTime) => {
  const hrs = startTime?.split(":")[0];
  const minutes = startTime?.split(":")[1];
  var endTime = "";
  var starttime = "";
  var isNoonEnd = "PM";
  var isNoonStart = "PM";
  if (Number(hrs) + 1 >= 13) {
    endTime = Number(hrs) + 1 - 12;
    endTime += `:${minutes}`;
  } else if (Number(hrs) + 1 >= 12) {
    endTime = 12;
    endTime += `:${minutes}`;
  } else {
    endTime = `${Number(hrs) + 1}:${minutes}`;
    isNoonEnd = "AM";
  }
  if (Number(hrs) >= 13) {
    starttime = Number(hrs) - 12;
    starttime += `:${minutes}`;
  } else if (Number(hrs) >= 12) {
    starttime = 12;
    starttime += `:${minutes}`;
  } else {
    starttime = `${hrs}:${minutes}`;
    isNoonStart = "AM";
  }
  return { starttime, isNoonStart, endTime, isNoonEnd };
};
export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}
