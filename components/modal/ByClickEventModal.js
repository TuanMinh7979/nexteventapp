import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../redux/eventSlice";
import { useState } from "react";
import moment from "moment";
import EditEventModal from "./EditEventModal";
import { useEffect } from "react";
import { updateSelectedEvent } from "../../redux/eventSlice";
import { setSelectedEvent } from "../../redux/eventSlice";
import { updateEvent } from "../../redux/eventSlice";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import dayjs from "dayjs";

const ByClickEventModal = (props) => {
  const { user, accessToken } = useContext(AuthContext);

  const [showEditModal, setShowEditModal] = useState(false);

  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allDay, setAllDay] = useState(false);
  const [status, setStatus] = useState("");

  const [desc, setDesc] = useState("");

  const { setShowActionModal } = props;

  const dispatch = useDispatch();

  const { events, selectedEvent } = useSelector((state) => state.eventSlice);

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
        setStartDate(new Date(event.getFullYear(), event.getMonth(), event.getDate(), event.getHours(), event.getMinutes()));

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

  const hdlSubmitUpdateEvent = () => {

    const newEvent = {
      _id: selectedEvent._id,
      title,
      textColor: "white",
      backgroundColor: color,
      allDay: allDay,
      desc: desc,
      start: moment(startDate).format("YYYY-MM-DD HH:mm"),
      end: moment(endDate).format("YYYY-MM-DD HH:mm"),
    };
    setShowEditModal(false);
    setShowActionModal(false);

    dispatch(
      updateEvent({ data: newEvent, token: accessToken })
    );
    setColor("")
    setStartDate(new Date())
    setEndDate(new Date())

    setTitle("")
    setAllDay(false)
    setDesc("")
  };

  useEffect(() => {

    if (Object.keys(selectedEvent).length) {
      let color = selectedEvent.backgroundColor;
      setDesc(selectedEvent.desc)
      setColor(color);
      setTitle(selectedEvent.title);
      setAllDay(selectedEvent.allDay);
      setStatus(selectedEvent.status)
      let start = `${moment(new Date(selectedEvent.start)).format()}`;
      let end = "";

      end = `${moment(new Date(selectedEvent.end)).format()}`;


      setStartDate(new Date(start));
      setEndDate(new Date(end));
    }
  }, [selectedEvent, events]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",

          padding: "4em",
          transform: "translate(-50%, -50%)",
          marginTop: "-40vh",
          zIndex: 999,
        }}
        id="actionForm"
      >
        <div class="relative w-full h-full max-w-2xl md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Action
              </h3>
              <button
                onClick={() => setShowActionModal(false)}
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                  actionForm
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="flex justify-center p-6 space-x-2 border-t  rounded-b dark:border-gray-600">
              <button
                onClick={() => setShowEditModal(true)}
                type="button"
                class="text-white bg-yellow-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowActionModal(false);

                  dispatch(
                    deleteEvent({
                      data: selectedEvent._id,
                      token: accessToken,
                    })
                  );
                }}
                type="button"
                class="text-white-500 bg-red-500  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Delete
              </button>
              {selectedEvent.status == "init" && (
                <button
                  onClick={() => {
                    setShowActionModal(false);

                    dispatch(
                      updateEvent({
                        data: { ...selectedEvent, status: "done" },

                        token: accessToken,
                      })
                    );
                  }}
                  type="button"
                  class="text-white-500 bg-green-500  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditEventModal
          modalTitle="Edit event"
          startDate={startDate}
          endDate={endDate}
          hdlDateChange={hdlDateChange}
          hdlInputChange={hdlInputChange}
          title={title}
          color={color}
          allDay={allDay}
          action={hdlSubmitUpdateEvent}
          setShowActionModal={setShowActionModal}
          setShowEditModal={setShowEditModal}
          status={status}
          setStatus={setStatus}
          desc={desc}
        ></EditEventModal>
      )}
    </>
  );
};

export default ByClickEventModal;
