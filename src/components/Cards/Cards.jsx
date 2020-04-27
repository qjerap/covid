import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./Cards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSkullCrossbones,
  faVirus,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";

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

const Cards = ({ globalData, dailiesData, province }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (province === "Canada") {
      setData({
        confirmed: globalData && globalData.confirmed.value,
        recovered: globalData && globalData.recovered.value,
        deaths: globalData && globalData.deaths.value
      });
    } else {
      setData({
        dayBeforeConfirmed: dailiesData[
          Object.keys(dailiesData)[Object.keys(dailiesData).length - 2]
        ].province[province]
          ? dailiesData[
              Object.keys(dailiesData)[Object.keys(dailiesData).length - 2]
            ].province[province].confirmed
          : 0,
        confirmed: dailiesData[
          Object.keys(dailiesData)[Object.keys(dailiesData).length - 1]
        ].province[province]
          ? dailiesData[
              Object.keys(dailiesData)[Object.keys(dailiesData).length - 1]
            ].province[province].confirmed
          : "/",
        recovered: dailiesData[
          Object.keys(dailiesData)[Object.keys(dailiesData).length - 1]
        ].province[province]
          ? dailiesData[
              Object.keys(dailiesData)[Object.keys(dailiesData).length - 1]
            ].province[province].recovered
          : "/",
        dayBeforeDeaths: dailiesData[
          Object.keys(dailiesData)[Object.keys(dailiesData).length - 2]
        ].province[province]
          ? dailiesData[
              Object.keys(dailiesData)[Object.keys(dailiesData).length - 2]
            ].province[province].deaths
          : 0,
        deaths: dailiesData[
          Object.keys(dailiesData)[Object.keys(dailiesData).length - 1]
        ].province[province]
          ? dailiesData[
              Object.keys(dailiesData)[Object.keys(dailiesData).length - 1]
            ].province[province].deaths
          : "/"
      });
    }
  }, [globalData, province]);

  if (!data.confirmed) {
    return (
      <div className={styles.loading}>
        <ScaleLoader css={override} size={10} color={"#77CDBB"} />{" "}
      </div>
    );
  } else {
    const { confirmed, recovered, deaths, lastUpdate } = globalData;
    return (
      <div className={styles.container}>
        <div className={cx(styles.grid)}>
          <div className={cx(styles.card)}>
            <div className={cx(styles.title, styles.infected)}>
              <h5>
                <FontAwesomeIcon icon={faVirus} /> Infected
              </h5>
            </div>

            <div className={styles.count}>
              {data.confirmed > 0 ? (
                <CountUp
                  start={0}
                  end={data.confirmed}
                  duration={1.5}
                  separator=","
                />
              ) : (
                <p>/</p>
              )}
              {data.dayBeforeConfirmed > 0 && (
                <span className={styles.subcount}>
                  (+
                  <CountUp
                    start={0}
                    end={data.confirmed - data.dayBeforeConfirmed}
                    duration={1.75}
                    separator=","
                  />
                  )
                </span>
              )}
            </div>
          </div>
          <div className={cx(styles.card)}>
            <div className={cx(styles.title, styles.recovered)}>
              <h5>
                <FontAwesomeIcon icon={faHeart} /> Recovered
              </h5>
            </div>

            <div className={styles.count}>
              {data.recovered > 0 ? (
                <CountUp
                  start={0}
                  end={data.recovered}
                  duration={1.75}
                  separator=","
                />
              ) : (
                <p>/</p>
              )}
            </div>
          </div>
          <div className={cx(styles.card)}>
            <div className={cx(styles.title, styles.deaths)}>
              <h5>
                <FontAwesomeIcon icon={faSkullCrossbones} /> Deaths
              </h5>
            </div>
            <div className={styles.count}>
              {data.deaths > 0 ? (
                <CountUp
                  start={0}
                  end={data.deaths}
                  duration={2}
                  separator=","
                />
              ) : (
                <p>/</p>
              )}{" "}
              {data.dayBeforeDeaths > 0 && (
                <span className={styles.subcount}>
                  (+
                  <CountUp
                    start={0}
                    end={data.deaths - data.dayBeforeDeaths}
                    duration={2.25}
                    separator=","
                  />
                  )
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cards;
