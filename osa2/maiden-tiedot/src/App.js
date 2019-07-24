import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './Filter'
import Results from './Results'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState({})

  const fetchCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;languages;population;flag')
      .then(res => {
        setCountries(res.data)
      }
    )
  }

  const fetchWeather = (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    axios.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(res => {
        setWeather(res.data)
      }
    )
  }

  useEffect(fetchCountries, [])

  const handleFilter = (event) => {
    setFilter(event.target.value.trim())
  }

  const handleShow = (name) => {
    setFilter(name)
  }

  const handleWeather = city => {
    fetchWeather(city)
  }

  return (
    <div>
      <Filter value={filter} onChange={handleFilter} />
      <Results filter={filter} countries={countries} onShow={handleShow} onWeather={handleWeather} weather={weather}/>
    </div>
  )
}

export default App;
