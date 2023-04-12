import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import dayjs from "dayjs";
const EventModal = (props) => {
  const {
    modalTitle,

    hdlDateChange,
    hdlInputChange,
    startDate,
    endDate,
    title,
    color,
    allDay,
    action,
    desc,
    setShowModal,

  } = props;
  const [errMsgs, setErrMsgs] = useState([]);
  const checkValid = () => {
    let errors = []; // create a new array to hold errors

    if (!title) errors.push("Title can not be empty")
    if (!color) errors.push("Color can not be empty")
    console.log(dayjs(startDate, "YYYY-MM-DD HH:mm"), ">>>>", dayjs(endDate, "YYYY-MM-DD HH:mm"), "<<<<<", dayjs(startDate, "YYYY-MM-DD HH:mm").isSame(dayjs(endDate, "YYYY-MM-DD HH:mm")))
    if (dayjs(startDate).isAfter(dayjs(endDate)) || dayjs(startDate, "YYYY-MM-DD HH:mm").isSame(dayjs(endDate, "YYYY-MM-DD HH:mm"))) {
      errors.push("startdate and enddate not valid");
    }

    setErrMsgs(errors); // update state with new errors
    return errors;
  };
  const hdlSubmit = () => {
    const err = checkValid()
    if (err.length === 0) {
      action()
    }
  }

  const modalId = "add-event-modal";
  return (
    <div
      id={modalId}
      class=""
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "800px",
        maxWidth: "100%",
        padding: "4em",
        transform: "translate(-50%, -50%)",
        marginTop: "-22vh",
        zIndex: 999,
      }}
    >
      <div class="relative w-full h-full max-w-2xl md:h-auto ">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 customModal">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {modalTitle}
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowModal(false)}
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
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div class="p-6 ">
            <form>
              <div class="mb-2">
                <label
                  for="text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  required
                  type="text"
                  class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="code something"

                  name="title"
                  value={title}
                  onChange={hdlInputChange}
                />
              </div>

              <div class="flex items-start mb-2">
                <div class="flex items-center h-5">
                  <input
                    id="all-day-inp"
                    type="checkbox"
                    name="allDay"
                    checked={allDay}
                    value={allDay}
                    onChange={hdlInputChange}
                    class="w-4 h-4 border  rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  All Day
                </label>
              </div>

              <div class="mb-2">
                <label
                  for="text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Desc
                </label>
                <textarea value={desc} name="desc" onChange={hdlInputChange}
                  class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

              </div>
              <label
                for="colors"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Color
              </label>
              <select
                required
                name="color"
                value={color}
                onChange={hdlInputChange}
                id="colors"
                class="mb-2 bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose a color</option>
                <option value="red" style={{ color: "red" }}>
                  Red
                </option>
                <option value="green" style={{ color: "green" }}>
                  Green
                </option>
                <option value="blue" style={{ color: "blue" }}>
                  Blue
                </option>
              </select>

              <div class="lg:flex  ">
                <div class="sm:w-full lg:w-1/2">
                  <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start
                  </label>

                  <DatePicker
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={1}
                    dateFormat="Pp"
                    selected={startDate}
                    onChange={(event) => hdlDateChange("startdate")(event)}
                  />
                </div>
                <div class="sm:w-full lg:w-1/2">
                  <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End
                  </label>

                  <DatePicker
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={1}
                    dateFormat="Pp"
                    selected={endDate}
                    onChange={(event) => hdlDateChange("enddate")(event)}
                  />

                </div>
              </div>
            </form>

            {
              errMsgs && (errMsgs.length > 0) && < ul >
                {
                  errMsgs.map((item, index) => (<li key={index}>
                    <span className="text-red-500">{item}</span>
                  </li>))
                }
              </ul>


            }


          </div>

          <div class="flex justify-end p-6 space-x-2 border-t  rounded-b dark:border-gray-600">
            <button
              data-modal-hide={modalId}
              type="button"
              onClick={hdlSubmit}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default EventModal;
