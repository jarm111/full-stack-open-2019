import React from 'react'

const Weather = ({weather}) => {
  // Check for empty object
  if(Object.entries(weather).length === 0 && weather.constructor === Object) {
    return <div>Loading weather...</div>
  }

  const {location, current} = weather

  return (
    <div>
      <h3>Weather in {location.name}</h3>
      <div><strong>temperature: </strong> {current.temp_c} Celcius</div>
      <img src={current.condition.icon} alt="weather-icon"/>
      <div><strong>wind: </strong> {current.wind_kph} kph direction {current.wind_dir}</div>
    </div>
  )
}

export default Weather
