import styles from "./weatherShower.module.css";
import WeatherCard from "../../../UI/weatherCard/weatherCard";

const WeatherShower = (props) => {
 
  return (
    <div className={styles.WeatherShower}>
      {props.show ? 
      (   
      <WeatherCard forecast={props.weatherData} /> 
      )
       : null}
    </div>
  );
};

export default WeatherShower;
