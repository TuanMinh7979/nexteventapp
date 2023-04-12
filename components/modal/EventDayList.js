import React from "react";
import dayjs from "dayjs";
const EventDayList = ({
  day,
  setShowEventDayList,
  dayEvents,
  hdlEventClick,
}) => {
  const titleVal = dayjs(day).format("DD MMMM");
  return (
    <div className="showDetail">
      <div className="showDetail_header">
        <span className="titlespan">{titleVal} </span>{" "}
        <button
          className="showDetail_close"
          onClick={() => setShowEventDayList(false)}
        >
          X
        </button>
      </div>
      <div className="showDetail_container">
        {dayEvents.map((evt, idx) => {
           let extraClass = ""
           if (evt.status == "done") {
             extraClass = "doneEvent"
           } else if (evt.status == "miss") {
             extraClass = "missEvent"
           }

          const evtStartFm = dayjs(evt.start).format("HH:mm MM-DD");
          const evtEndFm = dayjs(evt.end).format("HH:mm MM-DD");
          return (
            <div
              key={idx}
              onClick={() => hdlEventClick(evt)}
              style={{
                backgroundColor: evt.backgroundColor,
                height: "32px",
                width: "96%",
                margin: "6px auto",
                borderRadius: "0px",
                justifyContent: "space-between",
                display: "flex",
              }}
              className={`showDetail_component p-1 mr-3  text-sm rounded mb-1 truncate ${extraClass}`}
            >
              {!evt.allDay && (
                <>
                  {" "}
                  <span>
                    {evtStartFm} to {evtEndFm}
                  </span>
                  <span>{evt.title}</span>
                </>
              )}
              {evt.allDay && (
                <>
                  <span>All day from {evtStartFm}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventDayList;
