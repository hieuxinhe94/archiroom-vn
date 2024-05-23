import React, { useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ReactDOM from "react-dom";
 

const RenderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`text-purple-800 time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}  
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`text-purple-700 time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current} 
        </div>
      )}
    </div>
  );
};

export default function renderTimer({ duraion = 10, onComplete }) {
  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={duraion}
        colors={["#450053", "#F7B801", "#0C0053", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={onComplete}
      >
        {RenderTime }
      </CountdownCircleTimer>
    </div>
  );
}

