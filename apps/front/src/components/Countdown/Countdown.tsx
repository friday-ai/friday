import { useEffect } from "react";

interface CountdownProps {
  start: boolean;
  count: number;
}

export default function Countdown({ start, count }: CountdownProps) {
  useEffect(() => {
    if (start) {
      let counter = count;
      const style = document.getElementById("countdown")?.style;
      style?.setProperty("--value", counter.toString());
      setInterval(() => {
        if (counter > 0) {
          counter -= 1;
          style?.setProperty("--value", counter.toString());
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
