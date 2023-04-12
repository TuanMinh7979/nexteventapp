import React from "react";
import dayjs from "dayjs";

const MyCalendarHeader = ({ viewMonthIndex, setViewMonthIndex }) => {

  function handlePrevMonth() {
    setViewMonthIndex(viewMonthIndex - 1);
  }
  function handleNextMonth() {
    setViewMonthIndex(viewMonthIndex + 1);
  }
  function handleReset() {
    setViewMonthIndex(
      viewMonthIndex === dayjs().month()
        ? viewMonthIndex + Math.random()
        : dayjs().month()
    );
  }


  return (
    <div className="px-4 py-2 flex items-center">
      <img
        src="data:image/png;base64,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"
        alt="calendar"
        className="mr-2 w-12 h-12"
      />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <i class="fas fa-arrow-left"></i>
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <i class="fas fa-arrow-right"></i>
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), viewMonthIndex)).format("MMMM YYYY")}
      </h2>
    </div>
  );
};

export default MyCalendarHeader;
