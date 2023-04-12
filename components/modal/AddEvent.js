import React from "react";
import EventModal from "./EventModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../../redux/eventSlice";
import moment from "moment";
import { uuidv4 } from "@firebase/util";
import { AuthContext } from "../../context/AuthContextProvider";
import { useContext } from "react";
import dayjs from "dayjs";
const AddEvent = () => {
  const { user, accessToken } = useContext(AuthContext);


  const [color, setColor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allDay, setAllDay] = useState(false);
  const [desc, setDesc] = useState("");


  const dispatch = useDispatch();
  const hdlDateChange = (startOrEnd) => (event) => {
    if (!allDay) {
      if (startOrEnd === "startdate") {
        setStartDate(event);
      }
      if (startOrEnd === "enddate") {
        setEndDate(event);
      }
    } else {
      if (startOrEnd === "startdate") {
        setStartDate(new Date(event.getFullYear(), event.getMonth(), event.getDate(), event.getHours(), event.getMinutes(), event.getSeconds()));

      } else if (startOrEnd === "enddate") {
        setStartDate(new Date(event.getFullYear(), event.getMonth(), event.getDate(), startDate.getHours(), startDate.getMinutes()));

      }
      setEndDate(new Date(event.getFullYear(), event.getMonth(), event.getDate(), 23, 59))
    }
  };

  const hdlInputChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "color") {
      setColor(event.target.value);
    } else if (event.target.name === "allDay") {
      setAllDay(!allDay);
      if (!allDay === true) {
        setStartDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), startDate.getHours(), startDate.getMinutes()));
        setEndDate(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59))

      }
    } else if (event.target.name === "desc") {
      setDesc(event.target.value)
    }
  };

  const hdlSubmitAddEvent = (event) => {



    // id: uuidv4(),
    let newEvent = {
      title,
      textColor: "white",
      backgroundColor: color,
      desc: desc,
      allDay: allDay,
      start: moment(startDate).format("YYYY-MM-DD HH:mm"),
      end: moment(endDate).format("YYYY-MM-DD HH:mm"),
    };


    dispatch(

      addEvent({ newEvent, token: accessToken })
    );


    setColor("")
    setStartDate(new Date())
    setEndDate(new Date())
    setShowModal(false);
    setTitle("")
    setAllDay(false)
    setDesc("")
  };

  return (
    <div>
      <div class="">
        <button
          onClick={() => setShowModal(!showModal)}
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Add Event
        </button>
      </div>
      {showModal && (
        <EventModal

          desc={desc}
          modalTitle="Add event"
          startDate={startDate}
          endDate={endDate}
          hdlDateChange={hdlDateChange}
          hdlInputChange={hdlInputChange}
          title={title}
          color={color}
          allDay={allDay}
          action={hdlSubmitAddEvent}
          setShowModal={setShowModal}
        ></EventModal>
      )}
    </div>
  );
};

export default AddEvent;
