import React, { useEffect } from 'react';

interface CountdownProps {
  start: boolean;
  count: number;
}

function Countdown({ start, count }: CountdownProps) {
  useEffect(() => {
    if (start) {
      let counter = count;
      const style = document.getElementById('countdown')?.style;
      style?.setProperty('--value', counter.toString());
      setInterval(() => {
        if (counter > 0) {
          counter -= 1;
          style?.setProperty('--value', counter.toString());
        }
      }, 1000);
    }
  }, [start, count]);

  return (
    <span className="countdown">
      <span id="countdown" />
    </span>
  );
}

export default Countdown;
