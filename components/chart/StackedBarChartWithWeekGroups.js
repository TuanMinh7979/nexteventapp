import axios from "axios";
import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContextProvider";
import { getMonth } from "../../utils/timeUtil";
import dayjs from "dayjs";
import Pagination from "../global/Pagination";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { result } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const StackedBarChartWithWeekGroups = ({
  speMonth,
  events,
  doneEvents,
  missEvents,
}) => {
  // const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  useEffect(() => {
    {
      setCurrentMonth(getMonth(speMonth - 1));
    }
  }, [speMonth]);
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const [curWeek, setCurWeek] = useState([]);
  const [curWeekIdx, setCurWeekIdx] = useState(1);
  const [chartData, setCharData] = useState({
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "All",
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: "#FF6384",
      },
      {
        label: "Done",
        data: [20, 30, 40, 50, 60, 70, 80],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Miss",
        data: [30, 40, 50, 60, 70, 80, 90],
        backgroundColor: "#FFCE56",
      },
    ],
  });

  function countIntersection(arr1, status) {
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].status === status) {
        count++;
      }
    }
    return count;
  }

  const hdlPagination = (page) => {
    setPage(page);
    page = Number(page - 1);
    setCurWeekIdx(page);
  };

  useEffect(() => {
    const newCurrentMonth = currenMonth.map((item) =>
      item.map((el) => {
        return {
          d: el.date(),
          m: el.month(),
          data: [],
        };
      })
    );

    for (let item of events) {
      const dp = new Date(item.start).getDate();
      const mp = new Date(item.start).getMonth();
      for (let i = 0; i < newCurrentMonth.length; i++) {
        for (let dayi = 0; dayi < newCurrentMonth[i].length; dayi++) {
          if (
            newCurrentMonth[i][dayi].d == dp &&
            newCurrentMonth[i][dayi].m == mp
          ) {
            newCurrentMonth[i][dayi].data.push(item);
          }
        }
      }
    }

    setCurWeek(newCurrentMonth[curWeekIdx]);
  }, [events, curWeekIdx, speMonth, currenMonth]);

  const [page, setPage] = useState(1);

  const dayOfWArr = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  useEffect(() => {
    setCharData({
      labels: curWeek.map(
        (item, index) => `${dayOfWArr[index]} ${item.d} / ${item.m + 1}`
      ),

      datasets: [
        {
          label: "All",
          data: curWeek.map((item) => item.data.length),
          backgroundColor: "#FF6384",
        },
        {
          label: "Done",
          data: curWeek.map((item) => countIntersection(item.data, "done")),
          backgroundColor: "#36A2EB",
        },
        {
          label: "Miss",
          data: curWeek.map((item) => countIntersection(item.data, "miss")),
          backgroundColor: "#FFCE56",
        },
      ],
    });
  }, [curWeek]);

  return (
    <>
      <Bar data={chartData} options={options} />

      <div
        style={{ margin: "0 auto", display: "flex", justifyContent: "center" }}
      >
        <ul class="inline-flex -space-x-px">
          {page > 1 && (
            <li
              class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => hdlPagination(page - 1)}
            >
              <i class="fa-sharp fa-solid fa-arrow-left"></i>
            </li>
          )}

          {page < 5 && (
            <li
              class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => hdlPagination(page + 1)}
            >
              <i class="fa-sharp fa-solid fa-arrow-right"></i>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default StackedBarChartWithWeekGroups;
