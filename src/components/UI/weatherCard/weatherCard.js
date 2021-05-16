import { useState } from "react";

import styles from "./weatherCard.module.css";
import sunrise from "../../../assets/sunrise.png";
import sunset from "../../../assets/sunset.png";
const WeatherCard = ({ forecast }) => {
  const [showMore, setShowMore] = useState(false);
  const showMoreHandler = () => {
    setShowMore(true);
  };
  const pageWidth = document.documentElement.clientWidth;

  let result = null;
  if (
    !(Object.keys(forecast).length === 0 && forecast.constructor === Object)
  ) {
    result = (
      <div
        className={styles.WeatherCard}
        style={{
          gridTemplateRows: showMore
            ? "10% 25% 22% auto 40%"
            : "10% auto 22% 5%",
          height: showMore ? "550px" : "auto",
          height:
            showMore && pageWidth > 600
              ? "550px"
              : showMore && pageWidth <= 600
              ? "500px"
              : "auto",
        }}
      >
        <div className={styles.NameDiv}>
          <h1>{forecast.name}</h1>
          <sup>{forecast.country}</sup>
        </div>
        <div className={styles.UpDiv}>
          <div className={styles.IconDiv}>
            <img src={forecast.now.icon} alt="" />
            <p>{forecast.now.description}</p>
          </div>
          <div className={styles.UpDivData}>
            <div className={styles.UpDivDataTempDiv}>
              <p className={styles.UpDivDataTemp}>
                {forecast.now.temp}
                <span className={styles.Celsius}>&deg;C</span>
              </p>
            </div>
            <p>
              Feels like <span>{forecast.now.feels}</span>
              <span className={styles.Celsius}>&deg;C</span>
            </p>
          </div>
        </div>
        <div className={styles.MiddleDiv}>
          <div className={styles.MiddleDivInner}>
            <img src={sunset} alt="sunset icon" />
            <div>
              <span className={styles.Time}>{forecast.sunrise}</span>{" "}
              <sub>(U.K time)</sub>
            </div>
          </div>
          <div className={styles.MiddleDivInner}>
            <img src={sunrise} alt="sunset icon" />
            <div>
              <span>{forecast.sunset}</span> <sub>(U.K time)</sub>
            </div>
          </div>
        </div>
        <div className={styles.Empty}></div>
        <div
          className={styles.ShowButtonDiv}
          style={{ display: showMore ? "none" : "flex" }}
        >
          <button onClick={showMoreHandler}>Show more</button>
        </div>
        <div
          className={styles.DownDiv}
          style={{
            display: showMore ? "grid" : "none",
            gridTemplateColumns: showMore ? "repeat(4, 1fr)" : "none",
          }}
        >
          <div className={styles.LittleDataDiv}>
            <div className={styles.LittleDataDivTime}>
              {forecast.next[0].time}
            </div>
            <div className={styles.LittleDataDescription}>
              <img src={forecast.next[0].icon} alt="" />
              <p>{forecast.next[0].description}</p>
            </div>
            <div className={styles.LittleDataDivTemp}>
              {forecast.next[0].temp}
              <span className={styles.Celsius}>&deg;C</span>
            </div>
          </div>
          <div className={styles.LittleDataDiv}>
            <div className={styles.LittleDataDivTime}>
              {forecast.next[1].time}
            </div>
            <div className={styles.LittleDataDescription}>
              <img src={forecast.next[1].icon} alt="" />
              <p>{forecast.next[1].description}</p>
            </div>
            <div className={styles.LittleDataDivTemp}>
              {forecast.next[1].temp}
              <span className={styles.Celsius}>&deg;C</span>
            </div>
          </div>
          <div className={styles.LittleDataDiv}>
            <div className={styles.LittleDataDivTime}>
              {forecast.next[2].time}
            </div>
            <div className={styles.LittleDataDescription}>
              <img src={forecast.next[2].icon} alt="" />
              <p>{forecast.next[2].description}</p>
            </div>
            <div className={styles.LittleDataDivTemp}>
              {forecast.next[2].temp}
              <span className={styles.Celsius}>&deg;C</span>
            </div>
          </div>
          <div className={styles.LittleDataDiv}>
            <div className={styles.LittleDataDivTime}>
              {forecast.next[3].time}
            </div>
            <div className={styles.LittleDataDescription}>
              <img src={forecast.next[3].icon} alt="" />
              <p>{forecast.next[3].description}</p>
            </div>
            <div className={styles.LittleDataDivTemp}>
              {forecast.next[3].temp}
              <span className={styles.Celsius}>&deg;C</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return result;
};

export default WeatherCard;
