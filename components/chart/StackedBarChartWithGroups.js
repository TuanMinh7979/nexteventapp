import axios from 'axios';
import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';

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
      position: 'top',
    },

  },
};



const StackedBarChartWithGroups = ({ events, doneEvents, missEvents }) => {

  const [chartData, setCharData] = useState({
    labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
    datasets: [
      {
        label: 'All',
        data: [10, 20, 30, 40, 50, 60, 10, 20, 30, 40, 50, 60],
        backgroundColor: '#FF6384',
      },
      {
        label: 'Done',
        data: [20, 30, 40, 50, 60, 70, 20, 30, 40, 50, 60, 70],
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Miss',
        data: [30, 40, 50, 60, 70, 80, 30, 40, 50, 60, 70, 80],
        backgroundColor: '#FFCE56',
      },
    ],
  })

  function countIntersection(arr1, status) {

    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].status === status) {
        count++;
      }
    }
    return count;
  }
  useEffect(() => {
    const result = [];
    for (let i = 0; i < 12; i++) {
      result.push([]);
    }

    for (let item of events) {
   

      const month = new Date(item.start).getMonth() ; // get month index (0-11) from date
      result[month] = result[month]; // create empty array if it doesn't exist yet
      result[month].push(item); // push item to corresponding month array

    }





    setCharData({
      labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
      datasets: [
        {
          label: 'All',
          data: result.map(item => item.length),
          backgroundColor: '#FF6384',
        },
        {
          label: 'Done',
          data: result.map(item => countIntersection(item, "done")),
          backgroundColor: '#36A2EB',
        },
        {
          label: 'Miss',
          data: result.map(item => countIntersection(item, "miss")),
          backgroundColor: '#FFCE56',
        },
      ],
    })

  }, [events]);

  return (
    <Bar data={chartData} options={options} />
  )
}

export default StackedBarChartWithGroups

