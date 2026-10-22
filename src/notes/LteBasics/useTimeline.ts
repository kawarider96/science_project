import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type TimelineOptions = {
  duration: number;
  loop?: boolean;
  autoPlay?: boolean;
};

export function useTimeline({
  duration,
  loop = false,
  autoPlay = false,
}: TimelineOptions) {
  const reducedMotion = useReducedMotion();

  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const timeRef = useRef(0);

  useEffect(() => {
    setPlaying(autoPlay && reducedMotion === false);
  }, [autoPlay, reducedMotion]);

  useEffect(() => {
    if (!playing) return;

    let frame = 0;
    let previous: number | null = null;

    function tick(timestamp: number) {
      if (previous !== null) {
        const elapsed = Math.min((timestamp - previous) / 1000, 0.1);
        let next = timeRef.current + elapsed * speed;

        if (next >= duration) {
          if (loop) {
            next %= duration;
          } else {
            timeRef.current = duration;
            setTime(duration);
            setPlaying(false);
            return;
          }
        }

        timeRef.current = next;
        setTime(next);
      }

      previous = timestamp;
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [playing, speed, duration, loop]);

  function seek(next: number) {
    const clamped = Math.max(0, Math.min(duration, next));

    setPlaying(false);
    timeRef.current = clamped;
    setTime(clamped);
  }

  function toggle() {
    if (!playing && timeRef.current >= duration) {
      timeRef.current = 0;
      setTime(0);
    }

    setPlaying((current) => !current);
  }

  return { time, playing, speed, setSpeed, seek, toggle };
}