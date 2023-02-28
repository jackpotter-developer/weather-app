import './App.css';
import ForecastCard from './components/ForecastCard';
import Data from './Data';
import DetailsCard from './components/DetailsCard';
import DetailsData from './DetailsData';
import React from 'react';

function App() {

  const [weatherData, setWeatherData] = React.useState({
    latLon: [],
    city: "",
    cityConf: "Melbourne",
    data: {
      current:{
        temp_c: 0,
        uv:"0",
        cloud:"0",
        precip_mm:"0",
        humidity:"0",
        wind_kph:"0",
        pressure_mb:"0",
        feelslike_c:"0",
        vis_km:"0",
        condition:{
          text:"Sunny"
        }
      },
      location:{
        name:"Melbourne",
        country:"Australia"
      }
    },
    currentConditionImg: "sun-icon-grey.png",
    date:"1 January",
    time:"12:00am"
  })

  const [count, setCount] = React.useState(0)


  function handleChange(event){
    const {name, value} = event.target

    setWeatherData(prevWeatherData => ({
      ...prevWeatherData,
      [name]: value 
      
    }))
  }

  function handleSearch(){
    setWeatherData(prevWeatherData => ({
      ...prevWeatherData,
      cityConf: prevWeatherData.city
      
    }))
    
    // setCount(prevCount => prevCount + 1)

    fetch(`https://api.weatherapi.com/v1/current.json?key=5d5c146c84d64a47a7412716232102&q=${weatherData.cityConf}&aqi=no`)
              .then(res => res.json())
              .then(data => setWeatherData(prevWeatherData => {
                let newImg = " "
                if(data.current.condition.text === "Partly cloudy"){
                  newImg = "cloudy-icon-grey.png"
                }
                else if(data.current.condition.text.includes("rain")){
                  newImg = "rain-icon-grey.png"
                }
                else if(data.current.condition.text.includes("snow")){
                  newImg = "snowflake-icon-grey.png"
                }
                else if(data.current.condition.text.includes("storm")){
                  newImg = "storm-icon-grey.png"
                }else{
                  newImg = "sun-icon-grey.png"
                }

                let date = data.location.localtime

                date = date.slice(5,10)

                let month = ""
                if(date.slice(0,2) === "01"){
                  month = "January"
                }else if(date.slice(0,2) === "02"){
                  month = "February"
                }else if(date.slice(0,2) === "03"){
                  month = "March"
                }else if(date.slice(0,2) === "04"){
                  month = "April"
                }else if(date.slice(0,2) === "05"){
                  month = "May"
                }else if(date.slice(0,2) === "06"){
                  month = "June"
                }else if(date.slice(0,2) === "07"){
                  month = "July"
                }else if(date.slice(0,2) === "08"){
                  month = "August"
                }else if(date.slice(0,2) === "09"){
                  month = "September"
                }else if(date.slice(0,2) === "10"){
                  month = "October"
                }else if(date.slice(0,2) === "11"){
                  month = "November"
                }else if(date.slice(0,2) === "12"){
                  month = "December"
                }

                const dateStr = `${date.slice(3)} ${month}`

                let time = data.location.localtime.slice(10)

                // console.log(time)

                let hour = parseInt(time.slice(0,3))

                console.log(hour)

                if(hour > 12){
                  hour -= 12
                  time = time.slice(4)
                  time = `${hour}:${time}pm`
                }else{
                  time = `${time}am`
                }
          
                return {
                  ...prevWeatherData,
                  data: data,
                  currentConditionImg: newImg,
                  date: dateStr,
                  time: time
                }
                
              }))
    
  }

  React.useState(() => {
    if (weatherData.cityConf !== ""){
      fetch(`https://api.weatherapi.com/v1/current.json?key=5d5c146c84d64a47a7412716232102&q=Melbourne&aqi=no`)
              .then(res => res.json())
              .then(data => setWeatherData(prevWeatherData => ({
                ...prevWeatherData,
                data: data
              })))
    }

    setWeatherData(prevWeatherData => ({
      ...prevWeatherData,
      dataLoaded: true
    }))

    
    
  },[])

  console.log(weatherData.cityConf)
  console.log(weatherData.data)

  const forecastCards = Data.map(hour => {
    return(
      <ForecastCard 
        time={hour.time}
        temp={hour.temp}
      />
    )
  })

  const DetailsCards = DetailsData.map(detail => {
    return(
      <DetailsCard 
        title={detail.title}
        info={detail.info}
      />
    )
  })

  return (
    <div className='content'>
      <div className='searchbar'>
        <input
          type="text"
          className="searchbar--input"
          placeholder='E.g Melbourne'
          name="city"
          value={weatherData.city}
          onChange={handleChange}
        />
        <button onClick={handleSearch} className="searchbar--button">Search</button>
      </div>
      <div className='basic-information'>
        {/* <div className='today'>
          <div className='today--date'>
            <p className='today--title'>Today</p>
            <p className='today--date'>{weatherData.date}</p>
          </div>
          <div className='today--temp-img'>
            <img src={weatherData.currentConditionImg} className='today--img'/>
            <h3 className='today--temp'>{Math.round(weatherData.data.current.temp_c)}&#176;</h3>
          </div>
          <div className='today--location'>
            <div className='today--city'>
              <img src='location-icon.png'/>
              <p >{weatherData.data.location.name}</p>
            </div>
            <p>{weatherData.data.location.country}</p>
          </div>
        </div> */}
        <div className='location-weather'>
          <p className='city'>{weatherData.data.location.name}, {weatherData.data.location.country}</p>
          {/* <p className='date'>{weatherData.date}</p> */}
          <div className='today--temp-img'>
            <img src={weatherData.currentConditionImg} className='today--img'/>
            <div className='today--temp-description'>
              <p className='today--temp'>{weatherData.data.current.temp_c}&#176;</p>
              <p className='today--description'>{weatherData.data.current.condition.text}</p>
            </div>
          </div>
        </div>
        <div className='today--details'>
            <p className='today--details-title'>Local date/time</p>
            <p className='today--details-date'>{weatherData.date}</p>
            <p className='today--details-time'>{weatherData.time}</p>
        </div>
      </div>
      <hr></hr>
      <div className='details'>
        <p className='details--title'>Weather details</p>
        <div className='details--cards'>
          <div className="details-card">
            <div>
              <p className="details-card--title">UV INDEX</p>
              <p className="details-card--info">{weatherData.data.current.uv}</p>
            </div>
            <img src='sun-icon.png' className='details-card--img'/>
          </div>
          <div className="details-card">
              <div>
                <p className="details-card--title">CLOUD</p>
                <p className="details-card--info">{weatherData.data.current.cloud}%</p>
              </div>
              <img src='cloud-icon.png' className='details-card--img'/>
          </div>
          <div className="details-card">
              <div>
                <p className="details-card--title">PRECIPITATION</p>
                <p className="details-card--info">{weatherData.data.current.precip_mm} mm</p>
              </div>
              <img src='umbrella-icon.png' className='details-card--img'/>
          </div>
          <div className="details-card">
              <div>
                <p className="details-card--title">HUMIDITY</p>
                <p className="details-card--info">{weatherData.data.current.humidity}%</p>
              </div>
              <img src='water-icon.png' className='details-card--img'/>
          </div>
          <div className="details-card">
              <div>
                <p className="details-card--title">WIND</p>
                <p className="details-card--info">{weatherData.data.current.wind_kph} km/h</p>
              </div>
              <img src='windsock-icon.png' className='details-card--img'/>
          </div>
          <div className="details-card">
              <div>
                <p className="details-card--title">PRESSURE</p>
                <p className="details-card--info">{weatherData.data.current.pressure_mb} mb</p>
              </div>
              <img src='pressure-icon.png' className='details-card--img'/>
          </div>
          <div className="details-card">
              <div>
                <p className="details-card--title">FEELS LIKE</p>
                <p className="details-card--info">{weatherData.data.current.feelslike_c}&#176;</p>
              </div>
              <img src='thermometer-icon.png' className='details-card--img'/>
          </div>
          <div className="details-card">
              <div>
                <p className="details-card--title">VISIBILITY</p>
                <p className="details-card--info">{weatherData.data.current.vis_km} km</p>
              </div>
              <img src='island-icon.png' className='details-card--img'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
