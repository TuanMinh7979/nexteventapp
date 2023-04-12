import React from "react";
import Pagination from "@/components/global/Pagination";
import dayjs from "dayjs";
import EditEventModal from "@/components/modal/EditEventModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { useDispatch } from "react-redux";
import { updateEvent } from "@/redux/eventSlice";
import { deleteEvent } from "@/redux/eventSlice";
import { useRouter } from "next/router";
import { setSelectedEvent } from "@/redux/eventSlice";
import { GlobalContext } from "@/context/GlobalContextProvider";
import { setFilteredEvents } from "@/redux/eventSlice";
import isBetween from "dayjs/plugin/isBetween";
import DatePicker from "react-datepicker";
import PrivateRoute from "@/components/PrivateRoute";

dayjs.extend(isBetween);

const StatTable = () => {
    const [searchText, setSearchText] = useState("")
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const [filterBySpecific, setFilterBySpecific] = useState(false);
    //   =====================
    const { user, accessToken } = useContext(AuthContext);
    const { setMonthIndex, setFilteredMonthIndex } = useContext(GlobalContext);
    const { events, filterEvents } = useSelector((state) => state.eventSlice);
    const [viewEvents, setViewEvents] = useState([...events]);
    const [pageEvent, setPageEvent] = useState([...events]);
    const [color, setColor] = useState("all");
    const [filterColor, setFilterColor] = useState("all");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [desc, setDesc] = useState("");


    const [filterStartDate, setFilterStartDate] = useState(null);
    const [filterEndDate, setFitlerEndDate] = useState(null);
    const [allDay, setAllDay] = useState(false);
    const [curEid, setCurEid] = useState("");


    const [filterStatus, setFilterStatus] = useState("all");

    const [speDay, setSpeDay] = useState("all");
    const [speMonth, setSpeMonth] = useState("all");
    const [selectedEventStatus, setSelectedEventStatus] = useState("");
    console.log(events)

    console.log("------------....", router.query)
    const searchParams = router.query

    const viewFilterInCalendar = () => {
        const viewEventsCp = [...viewEvents];
        // let startMonthIdx = dayjs().month();
        let startMonthIdx = 11;
        for (let el of viewEventsCp) {
            if (dayjs(el.start).month() < startMonthIdx) {
                startMonthIdx = dayjs(el.start).month();
            }
        }

        setFilteredMonthIndex(startMonthIdx);
        dispatch(setFilteredEvents([...viewEvents]));
        router.push("/filteredcalendar");
    };
    useEffect(() => {
        if (!filterBySpecific) {
            setSpeDay("all");
            setSpeMonth("all");
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    }, [filterBySpecific]);

    const doneTask = (event) => (item) => {
        if (item.status === "init" && event.target.value === "done") {
            dispatch(
                updateEvent({
                    data: { ...item, status: "done" }
                    ,
                    token: accessToken,
                })
            );
        }
    };
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
            _id: curEid,
            title,
            textColor: "white",
            backgroundColor: color,
            desc: desc,
            allDay: allDay,
            start: moment(startDate).format("YYYY-MM-DD HH:mm"),
            end: moment(endDate).format("YYYY-MM-DD HH:mm"),
        };
        setShowEditModal(false);

        dispatch(
            updateEvent({ data: newEvent, token: accessToken })
        );
    };

    const hdlOnEditClick = (selectedEvent) => {
        if (Object.keys(selectedEvent).length) {
            let color = selectedEvent.backgroundColor;
            setCurEid(selectedEvent._id);
            setColor(color);
            setTitle(selectedEvent.title);
            setAllDay(selectedEvent.allDay);
            setDesc(selectedEvent.desc)


            setSelectedEventStatus(selectedEvent.status)
            let start = `${moment(new Date(selectedEvent.start)).format()}`;
            let end = "";
            if (!selectedEvent.allDay) {
                end = `${moment(new Date(selectedEvent.end)).format()}`;
            } else {
                end = `${moment(new Date(selectedEvent.end)).format("YYYY-MM-DD")}`;
            }

            setStartDate(new Date(start));
            setEndDate(new Date(end));
            //   ---
            setShowEditModal(true);
        }
    };

    const hdlPagination = (page) => {
        page = Number(page) * 1 || 1;
        let limit = 3;
        let skip = (page - 1) * limit;
        //firstime call back viewEvent still empty

        setPageEvent([...viewEvents].slice(skip, skip + limit));
    };

    const hdlGotoCalendar = (item) => {
        const startMonthIdx = dayjs(item.start).month();
        setFilteredMonthIndex(startMonthIdx);
        dispatch(setFilteredEvents([item]));
        router.push("/filteredcalendar");
    };
    useEffect(() => {
        let newPage = searchParams.page;
        newPage = Number(newPage) * 1 || 1;
        let limit = 3;
        let skip = (newPage - 1) * limit;
        setPageEvent([...viewEvents].slice(skip, skip + limit));
    }, [searchParams, events, viewEvents]);

    useEffect(() => {
        let filterViewEvents = [...events];

        filterViewEvents = filterViewEvents.filter((item) => {
            if (filterColor !== "all" && filterStatus !== "all") {
                return (
                    item.backgroundColor == filterColor && item.status === filterStatus
                );
            } else if (filterColor !== "all") {
                return item.backgroundColor == filterColor;
            } else if (filterStatus !== "all") {
                return item.status === filterStatus;
            } else return true;
        });

        filterViewEvents = filterViewEvents.filter((item) => {
            if (filterBySpecific) {
                //speDay and speMonth
                if (speDay !== "all" && speMonth !== "all") {
                    return (
                        dayjs(item.start).date() == speDay &&
                        dayjs(item.start).month() + 1 == speMonth
                    );
                } else if (speDay !== "all") {
                    return dayjs(item.start).date() == speDay;
                } else if (speMonth !== "all") {
                    return dayjs(item.start).month() + 1 == speMonth;
                } else return true;
            } else if (filterStartDate !== null && filterEndDate !== null) {
                return (
                    dayjs(item.start).isBetween(
                        dayjs(filterStartDate).format(),
                        dayjs(filterEndDate).format(),
                        "day",
                        "[]"
                    ) &&
                    dayjs(item.end).isBetween(
                        dayjs(filterStartDate).format(),
                        dayjs(filterEndDate).format(),
                        "day",
                        "[]"
                    )
                );
            } else return true;
        });
        if (searchText) {
            filterViewEvents = filterViewEvents.filter((item) => {
                return item.title.includes(searchText)
            })
        }


        setViewEvents(filterViewEvents);
    }, [
        events,
        filterColor,
        filterStartDate,
        filterEndDate,
        speDay,
        speMonth,
        filterStatus,
        searchText,
        filterBySpecific
    ]);
    const [numOfPage, setNumOfPage] = useState(0);
    useEffect(() => {
        const newNumOfPage =
            viewEvents.length % 3 === 0
                ? viewEvents.length / 3
                : Math.floor(viewEvents.length / 3) + 1;

        setNumOfPage(newNumOfPage);
    }, [viewEvents]);



    return (
        <PrivateRoute>
            <div style={{ height: "100vh" }} className="p-1 sm:ml-56  mt-14">
                <div className="flex">      <button style={{ height: "40px" }} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => router.push("/")}><i class="fa-solid fa-arrow-left"></i></button>
                </div>
                <div
                    style={{ width: "90%", margin: "16px auto" }}
                    className=" mt-4 items-end justify-between lg:flex"
                >
                    <div class="container sm:w-full md:w-full lg:w-1/2  px-4 py-4">
                        <div
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                                display: "flex",
                            }}
                            class="flex flex-wrap "
                        ><input
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                style={{ width: "100%" }}
                                type="text"
                                class="mb-4 w-full border-gray-300 rounded-md shadow-sm pl-10 pr-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Search"
                            />
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <h2 class="text-lg font-medium mr-2">Filters:</h2>
                                <div class="flex items-center">
                                    <label class="inline-flex items-center">
                                        <input
                                            type="radio"
                                            class="form-radio"
                                            name="filterType"
                                            value="timeRange"
                                            onChange={() => setFilterBySpecific(!filterBySpecific)}
                                            checked={!filterBySpecific}
                                        />
                                        <span class="ml-2">Time Range</span>
                                    </label>
                                    <label class="inline-flex items-center ml-2">
                                        <input
                                            type="radio"
                                            class="form-radio"
                                            name="filterType"
                                            value="specificDate"
                                            onChange={() => setFilterBySpecific(!filterBySpecific)}
                                            checked={filterBySpecific}
                                        />
                                        <span class="ml-2">Specific Date</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {filterBySpecific ? (
                            <div id="specificDateFilter">
                                <div
                                    style={{
                                        width: "100%",
                                        justifyContent: "space-between",
                                        display: "flex",
                                    }}
                                    class="flex flex-wrap mb-4"
                                >
                                    <div class="sm:w-1/2 md:w-1/2 lg:w-1/2">
                                        <label class="block font-medium mb-2">Month</label>
                                        <div class="relative inline-block ">
                                            <select
                                                id="month"
                                                onChange={(event) => setSpeMonth(event.target.value)}
                                                name="month"
                                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="all">All</option>
                                                <option value="1">January</option>
                                                <option value="2">February</option>
                                                <option value="3">March</option>
                                                <option value="4">April</option>
                                                <option value="5">May</option>
                                                <option value="6">June</option>
                                                <option value="7">July</option>
                                                <option value="8">August</option>
                                                <option value="9">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=" sm:w-1/2 md:w-1/2 lg:w-1/2  ">
                                        <label class="block font-medium mb-2">Day</label>
                                        <div class="relative inline-block ">
                                            <select
                                                name="day"
                                                id="day"
                                                onChange={(event) => setSpeDay(event.target.value)}
                                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="all">All</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div id="rangeDateFilter">
                                <div
                                    style={{
                                        width: "100%",
                                        justifyContent: "space-between",
                                        display: "flex",
                                    }}
                                    class="flex flex-wrap mb-4"
                                >
                                    <div class="sm:w-1/2 md:w-1/2 lg:w-1/2">
                                        <label class="block font-medium mb-2">Start</label>
                                        <div class="">
                                            <DatePicker
                                                showTimeSelect
                                                timeFormat="p"
                                                timeIntervals={1}
                                                dateFormat="Pp"
                                                selected={filterStartDate}
                                                onChange={(event) => setFilterStartDate(event)}
                                            />
                                        </div>
                                    </div>
                                    <div class="sm:w-1/2 md:w-1/2 lg:w-1/2">
                                        <label class="block font-medium mb-2">End</label>
                                        <div class="">
                                            <DatePicker
                                                showTimeSelect
                                                timeFormat="p"
                                                timeIntervals={1}
                                                dateFormat="Pp"
                                                selected={filterEndDate}
                                                onChange={(event) => setFitlerEndDate(event)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div

                        style={{ height: "120px", alignItems: "baseline" }}
                        class="container sm:w-full md:w-full lg:w-1/2  px-4 py-4"
                    >
                        <div >

                            <div
                                style={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                    display: "flex",
                                }}
                                class="flex flex-wrap mb-4"
                            >
                                <div class=" sm:w-1/2 md:w-1/2 lg:w-1/2 mb-4">
                                    <label class="block font-medium mb-2">Status</label>
                                    <div class="relative inline-block ">
                                        <select
                                            id="statusSearchSel"
                                            name="status"
                                            onChange={(event) => setFilterStatus(event.target.value)}
                                            value={filterStatus}
                                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="all">All</option>
                                            <option value="init">Init</option>
                                            <option value="done">Done</option>
                                            <option value="miss">Miss</option>
                                        </select>
                                    </div>
                                </div>
                                <div class=" sm:w-1/2 md:w-1/2 lg:w-1/2 mb-4 ">
                                    <label class="block font-medium mb-2">Color</label>
                                    <div class="relative inline-block ">
                                        <select
                                            name="color"
                                            id="colorSearchSel"
                                            value={filterColor}
                                            onChange={(event) => setFilterColor(event.target.value)}
                                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="all">All</option>
                                            <option value="red" style={{ color: "red" }}>
                                                Red
                                            </option>
                                            <option style={{ color: "green" }} value="green">
                                                Green
                                            </option>
                                            <option style={{ color: "blue" }} value="blue">
                                                Blue
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {pageEvent && pageEvent.length > 0 ? <table
                    id="eventTable"
                    style={{ width: "90%", margin: "0 auto" }}
                    class=" table-auto border-collapse border border-green-800"
                >
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-4 py-2">#</th>
                            <th class="px-4 py-2">Title</th>
                            <th class="px-4 py-2">All Day</th>
                            <th class="px-4 py-2">Start</th>
                            <th class="px-4 py-2">End</th>
                            <th class="px-4 py-2">Color</th>
                            <th class="px-4 py-2">Status</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageEvent.map((item, index) => {

                                return (
                                    <tr key={index} class="border">
                                        <td class="border px-4 py-2 text-center">{index + 1}</td>
                                        <td class="border px-4 py-2 text-center">{item.title}</td>
                                        <td class="border px-4 py-2 text-center">
                                            {item.allDay ? "Yes" : "No"}
                                        </td>
                                        <td class="border px-4 py-2 text-center">
                                            {dayjs(item.start).format("DD/MM/YYYY HH:mm")}
                                        </td>
                                        <td class="border px-4 py-2 text-center">
                                            {dayjs(item.end).format("DD/MM/YYYY HH:mm")}
                                        </td>
                                        <td
                                            class="border px-4 py-2 text-center"
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                border: "none",
                                            }}
                                        >
                                            <div
                                                class="w-6 h-6 rounded-full"
                                                style={{ backgroundColor: item.backgroundColor }}
                                            ></div>
                                        </td>
                                        <td class="border px-4 py-2 text-center">
                                            <div class="relative inline-block">
                                                <select
                                                    onChange={(event) => doneTask(event)(item)}
                                                    value={item.status}
                                                    disabled={item.status !== "init" ? true : false}
                                                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="init">init</option>

                                                    <option value="done">done</option>
                                                    <option value="miss">miss</option>
                                                </select>
                                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                                            </div>
                                        </td>
                                        <td class="border px-4 py-2 text-center">
                                            <div class="flex justify-around">
                                                <button
                                                    onClick={() => hdlOnEditClick(item)}
                                                    class="p-1 rounded-full hover:bg-gray-200"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-6 w-6 text-blue-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 21a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h10l4 4v12z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        dispatch(
                                                            deleteEvent({
                                                                data: item._id,

                                                                token: accessToken,
                                                            })
                                                        );
                                                    }}
                                                    class="p-1 rounded-full hover:bg-gray-200"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-6 w-6 text-red-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => hdlGotoCalendar(item)}
                                                    class="p-1 rounded-full hover:bg-gray-200"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fill="#888"
                                                            d="M21,19H3V8h18V19z M5,10v7h14v-7H5z M5,5h2v2h2V5h6v2h2V5h2v3H5z M8,16h2v-2H8V16z M12,16h2v-2h-2V16z M16,16h2v-2h-2V16z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table> :
                    <div className="text-center">NOTHING</div>
                }

                <div class="flex justify-end" style={{ width: "90%", margin: "16px auto" }}>
                    <button onClick={viewFilterInCalendar} type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">View in Calendar</button>

                </div>

                <div
                    style={{ margin: "0 auto", display: "flex", justifyContent: "center" }}
                >
                    <Pagination total={numOfPage} callback={hdlPagination}></Pagination>
                </div>

                {showEditModal && selectedEventStatus && (
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
                        desc={desc}
                        setShowEditModal={setShowEditModal}
                        status={selectedEventStatus}
                    ></EditEventModal>
                )}
            </div>
        </PrivateRoute>
    );
};

export default StatTable;
