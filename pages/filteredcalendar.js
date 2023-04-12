import React from "react";
import { getMonth } from "../utils/timeUtil"
import MyCalendarHeader from "@/components/global/MyCalendarHeader";

import FilteredMonth from "@/components/FilteredMonth";
import { useState } from "react";
import { GlobalContext } from "@/context/GlobalContextProvider";
import { useContext } from "react";
import { useEffect } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import AddEvent from "@/components/modal/AddEvent";

import ByClickEventModal from "@/components/modal/ByClickEventModal";
import { useRouter } from "next/router";
const FilteredCalendar = () => {
    const router = useRouter()
    const { filterMonthIdx, setFilteredMonthIndex } = useContext(GlobalContext);
    const [currenMonth, setCurrentMonth] = useState(getMonth(filterMonthIdx));
    const [showActionModal, setShowActionModal] = useState(false);

    useEffect(() => {
        {
            setCurrentMonth(getMonth(filterMonthIdx));
        }
    }, [filterMonthIdx]);

    console.log("CURRENT MONT NOW", filterMonthIdx, currenMonth)
    return (
        <PrivateRoute>
            <div className="p-1 sm:ml-56   mt-14">
                <div className="flex">      <button style={{ height: "40px" }} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={() => router.push("/stattable")}><i class="fa-solid fa-arrow-left"></i></button>
                </div>

                <div className="h-screen flex flex-col">
                    <MyCalendarHeader viewMonthIndex={filterMonthIdx} setViewMonthIndex={setFilteredMonthIndex} />
                    <div className="flex flex-1">
                        <FilteredMonth setShowActionModal={setShowActionModal} month={currenMonth} />
                    </div>
                </div>

                {showActionModal && <ByClickEventModal setShowActionModal={setShowActionModal}></ByClickEventModal>}
            </div>
        </PrivateRoute>
    );
};

export default FilteredCalendar;
