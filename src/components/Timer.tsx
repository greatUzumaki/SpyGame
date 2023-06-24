import { useState, useEffect } from 'preact/hooks';

interface ITimer {
  initialMinutes: number;
  onTimeout: () => void;
}

export const Timer = ({ initialMinutes = 5, onTimeout }: ITimer) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (minutes === 0 && seconds === 0) {
      onTimeout(); // Вызываем функцию обратного вызова при истечении времени
      return;
    }

    interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, onTimeout]);

  return (
    <div className='timer'>
      <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
      <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  );
};
