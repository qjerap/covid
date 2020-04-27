import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";

const Chart = ({ dailiesData, province }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    setDailyData(dailiesData);
    provinceDeaths = [];
    provinceConfirmed = [];
    provinceRecovered = [];
  }, [dailiesData, province]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    size: 15;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  // global array data for chart
  const globalDeaths = [];
  const globalConfirmed = [];
  const globalRecovered = [];

  for (const date in dailyData) {
    globalDeaths.push(dailyData[date].global.deaths);
    globalConfirmed.push(dailyData[date].global.confirmed);
    globalRecovered.push(dailyData[date].global.recovered);
  }

  // Province array data for chart
  let provinceDeaths = [];
  let provinceConfirmed = [];
  let provinceRecovered = [];

  if (province != "Canada") {
    for (const date in dailyData) {
      if (!dailyData[date].province[province]) {
        provinceDeaths.push(0);
        provinceRecovered.push(0);
        provinceConfirmed.push(0);
      } else {
        dailyData[date].province[province] &&
          provinceDeaths.push(dailyData[date].province[province].deaths);
        dailyData[date].province[province] &&
          provinceConfirmed.push(dailyData[date].province[province].confirmed);
        dailyData[date].province[province] &&
          provinceRecovered.push(dailyData[date].province[province].recovered);
      }
    }
  }

  const lineChart = dailyData ? (
    <Bar
      data={{
        labels: Object.keys(dailyData),
        datasets: [
          {
            data: province === "Canada" ? globalDeaths : provinceDeaths,
            label: "deaths",
            borderColor: "#C05C55",
            backgroundColor: "#C05C55",
            fill: true,
            cubicInterpolationMode: "default",
            spanGaps: true
          }
        ]
      }}
      options={{
        legend: {
          display: true,
          labels: {
            fontColor: "#222"
          }
        },
        title: { display: true, text: `Current state in ${province}` },
        animation: {
          duration: 1500
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              stacked: false,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        maintainAspectRatio: false
      }}
    />
  ) : (
    <div className={styles.loading}>
      <ScaleLoader css={override} size={10} color={"#77CDBB"} />{" "}
    </div>
  );
  const lineChart2 = dailyData ? (
    <Bar
      data={{
        labels: Object.keys(dailyData),
        datasets: [
          {
            data: province === "Canada" ? globalDeaths : provinceDeaths,
            label: "deaths",
            borderColor: "#C05C55",
            backgroundColor: "#C05C55",
            fill: true,
            cubicInterpolationMode: "default",
            spanGaps: true
          },
          {
            data: province === "Canada" ? globalRecovered : provinceRecovered,
            label: "recovered",
            borderColor: "green",
            backgroundColor: "#77CDBB",
            fill: false
          },
          {
            data: province === "Canada" ? globalConfirmed : provinceConfirmed,
            label: "confirmed",
            borderColor: "#8F63A2",
            backgroundColor: "#8F63A2",
            fill: false
          }

        ]
      }}
      options={{
        legend: {
          display: true,
          labels: {
            fontColor: "#222"
          }
        },
        title: { display: true, text: `Current state in ${province}` },
        animation: {
          duration: 1500
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              stacked: false,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        maintainAspectRatio: false,

        showLines: true
      }}
    />
  ) : (
    <div className={styles.loading}>
      <ScaleLoader css={override} size={10} color={"#77CDBB"} />{" "}
    </div>
  );

  return (
    <div className={styles.container}>
        <div>{lineChart2}</div>

        <div>{lineChart}</div>
    </div>
  );
};

export default Chart;
