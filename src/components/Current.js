import React from "react";
import ForecastCard from "./ForecastCard";
import Data from './Data';

export default function Current(props){

    const forecastCards = Data.map(hour => {
        return(
          <ForecastCard 
            time={hour.time}
            temp={hour.temp}
          />
        )
      })

    return (
        <div className='basic-information'>
            <div className='today'>
            <div className='today--date'>
                <p className='today--title'>Today</p>
                <p className='today--date'>Wed, 17 Feb</p>
            </div>
            {/* <h3 className='today--temp'>{weatherData ? (Math.round(weatherData.data.current.temp)) : "22"}</h3> */}
            <p>Melbourne</p>
            </div>
            <div className='forecast'>
                {forecastCards}
            </div>
        </div>
    )
}