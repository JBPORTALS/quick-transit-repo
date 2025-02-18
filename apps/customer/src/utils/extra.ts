import { format, parse } from "date-fns";

export function convertTo12HourFormat(time24: string) {
    // Parse the time string into a Date object
    const date = parse(time24, "HH:mm:ss", new Date());
  
    // Format the Date object into 12-hour format with AM/PM
    const formattedTime = format(date, "h:mm a");
  
    return formattedTime;
  }