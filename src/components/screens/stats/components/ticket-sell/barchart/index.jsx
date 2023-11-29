import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Bars({ ticketsData, totalVips }) {
  console.log("Total de VIPs:", totalVips);
  var data = [
    ticketsData.soldPresale,
    ticketsData.soldGeneral,
    ticketsData.sold2x1,
    totalVips,
  ];
  var kinds = ["Preventa", "General", "2x1", "VIPs"];

  var total = ticketsData.totalSold + totalVips;

  var options = {
    responsive: true,
    animation: true,
    indexAxis: "y",

    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: [
            "rgba(34, 197, 94, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(59, 130, 246, 1)",
            "rgba(245, 158, 11, 1)",
          ],
        },
        grid: {
          color: "transparent",
        },
        border: { color: "transparent" },
      },
      x: {
        ticks: { color: "transparent" },
        grid: {
          color: "transparent",
        },
        border: { color: "transparent" },
        min: 0,
        max: total,
      },
    },
  };

  var midata = {
    labels: kinds,
    datasets: [
      {
        barThickness: 15,
        borderRadius: 20,
        borderSkipped: "none",
        data: data,
        backgroundColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(245, 158, 11, 1)",
        ],
      },
    ],
  };

  return <Bar data={midata} options={options} />;
}
