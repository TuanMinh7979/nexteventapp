import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import Link from "next/link";
import { useSelector } from "react-redux";
import { setFilteredEvents } from "@/redux/eventSlice";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import StackedBarChartWithGroups from "@/components/chart/StackedBarChartWithGroups";
import StackedBarChartWithWeekGroups from "@/components/chart/StackedBarChartWithWeekGroups";
import { GlobalContext } from "@/context/GlobalContextProvider";
const Dashboard = () => {
    const { user, accessToken, signOut } = useContext(AuthContext);
    const { events } = useSelector((state) => state.eventSlice);
    const [showByMonth, setShowByMonth] = useState(false);
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    const [speMonth, setSpeMonth] = useState(monthIndex + 1);
    const doneEvents = events.filter((item) => {
        return item.status == "done";
    });
    const initEvents = events.filter((item) => {
        return item.status == "init";
    });
    const missEvents = events.filter((item) => {
        return item.status == "miss";
    });
    useEffect(() => {
        setSpeMonth(monthIndex + 1);
    }, [monthIndex]);

    return (
        <div className="p-1 sm:ml-56  mt-14">
            {!accessToken && <p>Please login before</p>}
            {accessToken && (
                <>
                    <div className="flex">
                        <p>{`Welcome ${user.name}`} </p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <Link href="/stattable">Go to Table View</Link>
                        </button>
                        <button
                            onClick={() => setShowByMonth(!showByMonth)}
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {showByMonth ? "By Month" : "By Year"}
                        </button>
                        {showByMonth && (
                            <div class="flex sm:w-1/2 md:w-1/2 lg:w-1/2">
                                <label class="block font-medium mb-2">Month</label>
                                <div class="relative inline-block ">
                                    <select
                                        id="month"
                                        value={speMonth}
                                        onChange={(event) => {
                                            setSpeMonth(event.target.value);
                                        }}
                                        name="month"
                                        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    >
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
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="card m-5 p-5">
                            <div className="flex justify-between">
                                {showByMonth ? (
                                    <p className="text-3xl">
                                        {
                                            events.filter((item) => {

                                                return dayjs(item.start).month() + 1 == speMonth;
                                            }).length
                                        }
                                        All
                                    </p>
                                ) : (
                                    <p className="text-3xl">{events.length} All</p>
                                )}
                            </div>
                        </div>
                        <div className="card m-5 p-5">
                            <div className="flex justify-between">
                                {showByMonth ? (
                                    <p className="text-3xl">
                                        {" "}
                                        {
                                            initEvents.filter((item) => {

                                                return dayjs(item.start).month() + 1 == speMonth;
                                            }).length
                                        }{" "}
                                        Init
                                    </p>
                                ) : (
                                    <p className="text-3xl">{initEvents.length} Init</p>
                                )}
                            </div>
                        </div>
                        <div className="card m-5 p-5">
                            <div className="flex justify-between">
                                {showByMonth ? (
                                    <p className="text-3xl">
                                        {" "}
                                        {
                                            doneEvents.filter((item) => {

                                                return dayjs(item.start).month() + 1 == speMonth;
                                            }).length
                                        }{" "}
                                        Done
                                    </p>
                                ) : (
                                    <p className="text-3xl">{doneEvents.length} Done</p>
                                )}
                            </div>
                        </div>

                        <div className="card m-5 p-5">
                            <div className="flex justify-between">
                                {showByMonth ? (
                                    <p className="text-3xl">
                                        {" "}
                                        {
                                            missEvents.filter((item) => {

                                                return dayjs(item.start).month() + 1 == speMonth;
                                            }).length
                                        }{" "}
                                        Miss
                                    </p>
                                ) : (
                                    <p className="text-3xl">{missEvents.length} Miss</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl">Working Report</h2>

                    <div style={{ width: "80%", margin: "0 auto" }} className="">
                        {showByMonth ? (
                            <StackedBarChartWithWeekGroups
                                speMonth={speMonth}
                                events={events}
                                doneEvents={doneEvents}
                                missEvents={missEvents}
                            />
                        ) : (
                            <StackedBarChartWithGroups
                                events={events}
                                doneEvents={doneEvents}
                                missEvents={missEvents}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
