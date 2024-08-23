import React, { useEffect, useState } from "react";

function ProgressBar({ Timer }) {
  const [remainingTime, setRemainingTime] = useState(Timer);

  useEffect(() => {
    let interval = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTime((prevTime) => prevTime - 20);
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={Timer} value={remainingTime} />;
}

export default ProgressBar;
