import React from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import timegridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { setSelectedEvent } from "../../redux/eventSlice";
import { useSelector } from "react-redux";
import ByClickEventModal from "../modal/ByClickEventModal";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Calendar = () => {
  const { events } = useSelector((state) => state.eventSlice);
  const dispatch = useDispatch();
  const [showActionModal, setShowActionModal] = useState(false);

  const eventClassNames = function (arg) {
    if (arg.event.allDay) {
      return ["alldayeventstyle"];
    } else {
      return [""];
    }
  };

  const hdlEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    dispatch(setSelectedEvent(event));
    setShowActionModal(!showActionModal);
  };
  return (
    <>
      <FullCalendar
        plugins={[daygridPlugin, timegridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth, timeGridWeek, timeGridDay",
        }}
        initialView="dayGridMonth"
        events={events}
        displayEventEnd={true}
        eventDisplay={"block"}
        eventClassNames={eventClassNames}
        eventClick={hdlEventClick}
        dayMaxEvents={2}
      ></FullCalendar>
      {showActionModal && (
        <ByClickEventModal
          setShowActionModal={setShowActionModal}
  
        ></ByClickEventModal>
      )}
    </>
  );
};

export default Calendar;
