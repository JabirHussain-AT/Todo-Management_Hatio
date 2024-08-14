import React, { useState, useEffect } from "react";

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // Update greeting based on the current time
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    // Set the current date and time
    const dateString = now.toDateString();
    setDateTime(`${dateString}, ${timeString}`);

    // Update the time every second
    const interval = setInterval(() => {
      const updatedNow = new Date();
      const updatedTimeString = `${updatedNow.getHours().toString().padStart(2, "0")}:${updatedNow.getMinutes()
        .toString()
        .padStart(2, "0")}:${updatedNow.getSeconds()
        .toString()
        .padStart(2, "0")}`;
      setDateTime(`${updatedNow.toDateString()}, ${updatedTimeString}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-4">
      <h1 className="text-2xl font-bold">{greeting}!</h1>
      <p className="text-sm">{dateTime}</p>
    </div>
  );
};

export default Greeting;
