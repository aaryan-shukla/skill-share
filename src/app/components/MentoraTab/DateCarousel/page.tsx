import { DateItem } from "@/app/constants/types";
import { Clock } from "lucide-react";
import { useMemo } from "react";
import { useSessionStore } from "@/app/store/sessionStore";

const DateCarousel: React.FC = () => {
  const { selectedDate, setSelectedDate } = useSessionStore();

  const generateDateRange = (startDate: Date, days: number): DateItem[] => {
    const dates: DateItem[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: date.toISOString().split("T")[0],
      });
    }
    return dates;
  };

  const dates = useMemo(() => generateDateRange(new Date(), 6), []);

  return (
    <div className="flex space-x-1 p-2">
      <Clock color="#000" className="m-2" />
      {dates.map((dateItem, index) => (
        <div
          key={index}
          className={`relative w-16 h-10 flex flex-col items-center justify-center
            border-2 transition-all duration-300 ease-in-out cursor-pointer
            ${
              selectedDate === dateItem.fullDate
                ? "bg-red-400 text-white border-red-500"
                : "bg-gray-100 text-black border-gray-200 hover:border-red-300"
            }
            hover:w-32 hover:scale-105 hover:shadow-lg
          `}
          onClick={() => setSelectedDate(dateItem.fullDate)}
        >
          <span className="text-xs font-semibold transition-opacity duration-300">
            {dateItem.day}
          </span>
          <div
            className="absolute inset-0 flex flex-col justify-center items-center
            opacity-0 hover:opacity-100 hover:visible transition-all duration-300
            text-white bg-red-400"
          >
            <span className="text-sm font-semibold">{dateItem.day}</span>
            <span className="text-sm font-bold">{dateItem.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateCarousel;
