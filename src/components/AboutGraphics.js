import React from "react";
import { Line } from "react-chartjs-2";
//import "../assets/css/Graphics.css";

function AboutGraphics() {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "Graphic",
        fill: false,
        backgroundColor: "rgba(73,155,234,1)",
        borderColor: "rgba(73,155,234,1)",
        pointBorderColor: "rgba(73,155,234,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(73,155,234,1)",
        pointHoverBorderColor: "rgba(73,155,234,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0.17, 19, 156, 357, 565, 1149],
      },
    ],
  };
  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default AboutGraphics;
