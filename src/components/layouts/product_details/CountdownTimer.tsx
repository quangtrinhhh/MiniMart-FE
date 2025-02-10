"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
  expiryDate: string | Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryDate }) => {
  const [isClient, setIsClient] = useState(false); // Đảm bảo render sau khi client load
  const targetTime =
    typeof expiryDate === "string"
      ? new Date(expiryDate).getTime()
      : expiryDate.getTime();

  const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());
  const [prevTime, setPrevTime] = useState(formatTime(targetTime - Date.now()));

  // Đảm bảo chỉ render trên client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = targetTime - Date.now();
      setPrevTime(formatTime(timeLeft)); // Lưu giá trị cũ
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, timeLeft]);

  function formatTime(ms: number) {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return { hours, minutes, seconds };
  }

  const { hours, minutes, seconds } = formatTime(timeLeft);

  // Hiệu ứng xoay tròn từ trên xuống
  const flipVariants = {
    initial: { rotateX: 90, opacity: 0, y: -50 },
    animate: { rotateX: 0, opacity: 1, y: 0 },
    exit: { rotateX: -90, opacity: 0, y: 50 },
  };

  const FlipUnit = ({
    current,
    previous,
  }: {
    current: string;
    previous: string;
  }) => {
    const hasChanged = current !== previous;

    return (
      <div className="relative flex items-center justify-center w-7 h-7 bg-white rounded-md shadow-lg">
        <AnimatePresence mode="wait">
          {hasChanged ? (
            <motion.div
              key={current}
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-sm font-bold text-black"
            >
              {current}
            </motion.div>
          ) : (
            <div className="text-sm font-bold text-black">{current}</div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Chỉ render sau khi client load xong
  if (!isClient) return null;

  return (
    <div className="flex items-center text-center justify-center gap-2">
      <FlipUnit current={hours} previous={prevTime.hours} />
      <span className="text-2xl font-bold text-white ">:</span>
      <FlipUnit current={minutes} previous={prevTime.minutes} />
      <span className="text-2xl font-bold text-white ">:</span>
      <FlipUnit current={seconds} previous={prevTime.seconds} />
    </div>
  );
};

export default CountdownTimer;
