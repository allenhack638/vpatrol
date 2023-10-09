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

export function LatestSunday(date = new Date()) {
  const today = date;
  const daysUntilSunday = 7 - today.getDay();
  today.setDate(today.getDate() + daysUntilSunday - 7);
  return today;
}
export function convertTo24Hour(time12h) {
  if (!time12h) return;

  const [time, period] = time12h.split(" ");
  const [hour, minute] = time.split(":");

  let hour24 = parseInt(hour, 10);

  if (period === "PM" && hour24 !== 12) {
    // Add 12 hours to the hour if it's PM (except for 12 PM)
    hour24 += 12;
  } else if (period === "AM" && hour24 === 12) {
    // Handle 12 AM (midnight) by setting it to 0
    hour24 = 0;
  }

  // Format the hour and minute as two-digit strings
  const formattedHour = hour24.toString().padStart(2, "0");
  const formattedMinute = minute.padStart(2, "0");

  return `${formattedHour}:${formattedMinute}`;
}
export const startTimes = [
  "08:30 AM",
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "01:30 PM",
  "02:30 PM",
  "03:30 PM",
  "04:30 PM",
  "05:30 PM",
  "06:30 PM",
  "07:30 PM",
  "08:30 PM",
];

export function compareTimes(time1, time2) {
  const [hours1] = time1.split(":").map(Number);
  const [hours2] = time2.split(":").map(Number);

  if (hours1 < hours2) {
    return -1;
  } else if (hours1 === hours2) {
    return 0;
  } else {
    return 1;
  }
}
export const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
};
