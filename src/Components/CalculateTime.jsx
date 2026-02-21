  // Make the displayed seconds live-update in the browser using a component
  import React, { useEffect, useState } from "react";
import useStore from "./ZustandState";
  const CalculateTime = ({ e }) => {
    const Mode = useStore((store)=>store.Mode)
    const [currentTime, setCurrentTime] = useState(() => getLocalTime());
    useEffect(() => {
      setInterval(() => {
        setCurrentTime(getLocalTime());
      }, 1000);

     
    }, [e]);

    function getLocalTime() {
      let match;
      if (typeof e === "string") {
        // Handles e.g. "UTC+05:30" or "UTC-03:00"
        match = e.match(/UTC([+-])(\d{2}):?(\d{2})?/i);
      }
      if (!match) {
        // fallback: just show local time
        const d = new Date();
        return d.toLocaleTimeString();
      }

      const sign = match[1];
      const hours = parseInt(match[2], 10);
      const minutes = parseInt(match[3] || "0", 10);

      // Get current UTC time
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const utcSeconds = now.getUTCSeconds();

      // Calculate offset in minutes
      let offsetMinutes = hours * 60 + minutes;
      if (sign === '-') {
        offsetMinutes = -offsetMinutes;
      }

      // Apply offset to UTC time
      let totalMinutes = utcHours * 60 + utcMinutes + offsetMinutes;

      // Handle day overflow (wrap around 24 hours)
      while (totalMinutes < 0) {
        totalMinutes += 1440; // 24 * 60 minutes
      }
      while (totalMinutes >= 1440) {
        totalMinutes -= 1440;
      }

      // Calculate local hours and minutes
      const localHours = Math.floor(totalMinutes / 60);
      const localMinutes = totalMinutes % 60;

      // Format in 24-hour format (HH:MM:SS)
      const formattedTime = `${String(localHours).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')}:${String(utcSeconds).padStart(2, '0')}`;
      const value = [...formattedTime];
      const HourHand = value.slice(0, 2).join("");
      const value1 = value.slice(3, 5).join("");
      const value2 = value.slice(6).join(""); // Get the seconds part (should be 2 digits)

      // Convert hour to 12-hour format, handle midnight and noon
      let displayHour = Number(HourHand);
      let period = "AM";
      if (displayHour === 0) {
        displayHour = 12;
      } else if (displayHour >= 12) {
        period = "PM";
        if (displayHour > 12) {
          displayHour = displayHour - 12;
        }
      }
      return `${displayHour} : ${value1}:${value2.length === 2 ? value2 : String(utcSeconds).padStart(2, '0')} ${period}`;
    }

    return <span className={Mode?'text-red-600':'text-green-600'} >{currentTime}</span>;
  };

  export default CalculateTime;