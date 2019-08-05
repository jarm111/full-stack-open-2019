import React, {useEffect} from 'react'
import Weather from './Weather'

const Country = ({country, onWeather, weather}) => {
  const {name, capital, population, languages, flag} = country

  const callOnWeather = () => {
    onWeather(capital)
  }
  
  useEffect(callOnWeather, [])

  return (
    <div>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <h3>languages</h3>
      <ul>{languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
      <img src={flag} alt={`${name} flag`} style={{maxWidth: 150}}/>
      <Weather weather={weather}/>
    </div>
  )
}

export default Country
