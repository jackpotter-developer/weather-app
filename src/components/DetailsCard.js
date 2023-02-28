import React from "react";

export default function DetailsCard(props){
    return(
        <div className="details-card">
            <p className="details-card--title">{props.title}</p>
            <p className="details-card--info">{props.info}</p>
        </div>
    )
}