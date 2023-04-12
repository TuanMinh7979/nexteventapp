import React from "react";
import { getMonth } from "../utils/timeUtil";
import MyCalendarHeader from "../components/global/MyCalendarHeader";
import Month from "../components/Month";
import { useState } from "react";
import { GlobalContext } from "@/context/GlobalContextProvider";
import { useContext } from "react";
import { useEffect } from "react";

import AddEvent from "@/components/modal/AddEvent";
import { useSelector } from "react-redux";
import ByClickEventModal from "@/components/modal/ByClickEventModal";
import PrivateRoute from "@/components/PrivateRoute";

const Task = () => {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    const [filterColor, setFilterColor] = useState("all")
    const [showActionModal, setShowActionModal] = useState(false);
    const { events } = useSelector((state) => state.eventSlice);
    const [viewEvents, setViewEvents] = useState([...events])
    const [filterStatus, setFilterStatus] = useState("all");
    useEffect(() => {
        {
            setCurrentMonth(getMonth(monthIndex));
        }
    }, [monthIndex]);

    useEffect(() => {
        {
            let tmp = [...events]

            if (filterColor !== "all") {
                tmp = tmp.filter(item => item.backgroundColor === filterColor)
            }
            if (filterStatus !== "all") {
                tmp = tmp.filter(item => item.status === filterStatus)
            }

            setViewEvents([...tmp])
        }
    }, [filterColor, events, filterStatus]);
    console.log("month indx is ", monthIndex)
    return (
        <PrivateRoute>
            <div className="p-1 sm:ml-56 mt-14">
                <div className="lg:flex mt-4">
                    <div style={{ alignItems: "end", display: "flex" }} className=" sm:w-full md:w-full lg:w-full ">      <AddEvent></AddEvent></div>
                    <div style={{ alignItems: "end", display: "flex" }} className="flex sm:w-full md:w-full lg:w-full justify-evenly">
                        <div className="flex items-center">
                            <label class="block font-medium mb-2">Color :    </label>
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

                        <div className="flex items-center">
                            <label class="block font-medium mb-2">Status:</label>
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
                    </div>
                </div>

                <div className="h-screen flex flex-col">
                    <MyCalendarHeader viewMonthIndex={monthIndex} setViewMonthIndex={setMonthIndex} />
                    <div className="flex flex-1">
                        <Month eventData={viewEvents} setShowActionModal={setShowActionModal} month={currenMonth} />
                    </div>
                </div>

                {showActionModal && <ByClickEventModal setShowActionModal={setShowActionModal}></ByClickEventModal>}
            </div>
        </PrivateRoute>
    );
};

export default Task;
