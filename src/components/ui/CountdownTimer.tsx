"use client";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: string; // Chỉ thời gian kết thúc
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [status, setStatus] = useState<string>("not-started");

  // Hàm tính toán thời gian còn lại
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const endDateTime = new Date(endTime).getTime();

    if (now < endDateTime) {
      setStatus("ongoing");
      setTimeLeft(endDateTime - now); // Nếu trong khoảng thời gian diễn ra
    } else {
      setStatus("ended");
      setTimeLeft(0); // Nếu đã kết thúc
    }
  };

  // Cập nhật lại thời gian còn lại mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    // Cleanup interval khi component bị hủy
    return () => clearInterval(timer);
  }, [calculateTimeLeft, endTime]);

  // Hàm chuyển đổi thời gian còn lại thành định dạng "Giờ:Phút:Giây"
  function formatTime(ms: number) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  }

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="text-white flex-wrap flashsale__countdown-wrapper flex items-center gap-2 md:gap-5 lg:w-auto w-full justify-center">
      <span
        className={`flashsale__countdown-label text-center ${
          status === "not-started" ? "block" : "hidden"
        }`}
        data-label="not-started"
      >
        Chương trình sẽ bắt đầu sau
      </span>
      <span
        className={`flashsale__countdown-label text-center ${
          status === "ongoing" ? "block" : "hidden"
        }`}
        data-label="ongoing"
      >
        Nhanh lên nào! <br /> <b>Sự kiện sẽ kết thúc sau</b>
      </span>
      <span
        className={`flashsale__countdown-label text-center ${
          status === "ended" ? "block" : "hidden"
        }`}
        data-label="ended"
      >
        Chương trình đã kết thúc
      </span>
      <div className="flashsale__countdown">
        <div className="ega-badge-ctd flex items-center gap-2">
          <div className="flashsale__countdown-item bg-yellow-400 text-black font-semibold w-[4.4rem] md:w-[3.2rem] px-1 text-center py-1 md:py-1.5 rounded-sm">
            <div
              className="ega-badge-ctd__h ega-badge-ctd--transition text-h5 md:text-h4 font-semibold"
              style={{ transition: "all 0.5s ease" }}
            >
              {String(hours).padStart(2, "0")}
            </div>
            <span>Giờ</span>
          </div>
          <div className="bg-yellow-400 text-black font-semibold w-[4.4rem] md:w-[3.2rem] px-1 text-center py-1 md:py-1.5 rounded-sm">
            <div
              className="ega-badge-ctd__h ega-badge-ctd--transition ega-badge-ctd--animate text-h5 md:text-h4 font-semibold"
              style={{ transition: "all 0.5s ease" }}
            >
              {String(minutes).padStart(2, "0")}
            </div>
            <span>Phút</span>
          </div>
          <div className="bg-yellow-400 text-black font-semibold w-[4.4rem] md:w-[3.2rem] px-1 text-center py-1 md:py-1.5 rounded-sm">
            <div
              className="ega-badge-ctd__h ega-badge-ctd--animate text-h5 md:text-h4 font-semibold"
              style={{ transition: "all 0.5s ease" }}
            >
              {String(seconds).padStart(2, "0")}
            </div>
            <span>Giây</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
