import React from "react";

export default function ForecastCard(props){
    return(
        <div className="forecast-card">
            <p>{props.time}</p>
            <p className="forecast-temp">{props.temp}</p>
        </div>
    )
}