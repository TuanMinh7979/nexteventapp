import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { useSelector } from "react-redux";
import EventDayList from "./modal/EventDayList";
import { setSelectedEvent } from "../redux/eventSlice";
import { useDispatch } from "react-redux";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
export default function Day({ month, eventData, day, setShowActionModal }) {





  const [dayEvents, setDayEvents] = useState([]);
  const [showEventDayList, setShowEventDayList] = useState(false);


  const dispatch = useDispatch();


  const hdlEventClick = (evt) => {
    setShowActionModal(true);
    dispatch(setSelectedEvent(evt));
  };

  function getCurrentDayClass() {
    return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }


  useEffect(() => {

    const events1 = eventData.filter((evt) => {
      return day.isBetween(
        dayjs(evt.start).format(),
        dayjs(evt.end).format(),
        "day",
        "[]"
      );
    },[]);


    const event2 = events1.map((item) => {
      return { ...item, diff: dayjs(item.end).diff(dayjs(item.start), "hour") };
    });

    const event3 = event2.sort((a, b) => b.diff - a.diff);
    setDayEvents(event3);
  }, [eventData, month]);
  const limit = 2;

  return (
    <div
      style={{ position: "relative" }}
      className="daySection border  flex flex-col"
    >
      <div>
        <header className="flex flex-col items-center">
          {/* {rowIdx === 0 && ( */}
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
          {/* // )} */}
          <p
            className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
          </p>
        </header>
        <div className="flex-1 cursor-pointer">
          {dayEvents.map((evt, index) => {

            let extraClass = ""
            if (evt.status == "done") {
              extraClass = "doneEvent"
            } else if (evt.status == "miss") {
              extraClass = "missEvent"
            }
            const evtStartFm = dayjs(evt.start).format("HH:mm");
            const evtEndFm = dayjs(evt.end).format("HH:mm");



            if (index == limit) {

              //case = han
              const restNum = dayEvents.length - index;

              return (
                <div
                  key={index}
                  style={{
                    height: "32px",
                    width: "50%",
                  }}
                  className={` p-1 mr-3  text-sm rounded mb-1 truncate `}
                >
                  <span
                    onClick={() => setShowEventDayList(true)}
                    style={{ color: "black" }}
                  >
                    +{restNum} more...
                  </span>
                </div>
              );
            } else if (index > limit - 1) {
              //case vuot limit
              return null;
            }
            if (
              evt.allDay
            ) {

              //case all day
              return (
                <div
                  key={index}
                  onClick={() => hdlEventClick(evt)}
                  style={{
                    backgroundColor: evt.backgroundColor,
                    height: "32px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "12px",
                  }}
                  className={` p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate ${extraClass}`}
                >
                  <span style={{ color: "white" }}>All Day {evtStartFm}</span>
                  <span style={{ color: "white" }}> {evt.title}</span>
                </div>
              );
            }
            if (
              dayjs(evt.start).format("DD-MM-YYYY") === day.format("DD-MM-YYYY")
            ) {

              return (
                <div
                  key={index}
                  onClick={() => hdlEventClick(evt)}
                  style={{
                    backgroundColor: evt.backgroundColor,
                    height: "32px",
                    width: "103%",

                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    zIndex: 234,
                    position: "relative",
                  }}
                  className={` p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate ${extraClass}`}
                >
                  <span style={{ color: "white" }}>
                    {evtStartFm}-{evt.title}
                  </span>
                </div>
              );
            }
            if (
              dayjs(evt.end).format("DD-MM-YYYY") == day.format("DD-MM-YYYY")
            ) {
              return (
                <div
                  key={index}
                  onClick={() => hdlEventClick(evt)}
                  style={{
                    backgroundColor: evt.backgroundColor,
                    height: "32px",
                    width: "103%",
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                    zIndex: 234,
                    position: "relative",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  className={` p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate ${extraClass}`}
                >
                  {" "}
                  <span style={{ color: "white" }}>{evtEndFm}</span>
                </div>
              );
            }

            return (

              <div
                key={index}
                onClick={() => hdlEventClick(evt)}
                style={{
                  backgroundColor: evt.backgroundColor,
                  height: "32px",
                  width: "103%",
                  borderRadius: "0px",
                  zIndex: 234,
                  position: "relative",
                }}
                className={` p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate ${extraClass}`}
              >
                {" "}
              </div>
            );


            // return null;


          })}
        </div>
      </div>

      {showEventDayList && (
        <EventDayList
          day={day}
          setShowEventDayList={setShowEventDayList}
          dayEvents={dayEvents}
          hdlEventClick={hdlEventClick}
        />
      )}
    </div>
  );
}
