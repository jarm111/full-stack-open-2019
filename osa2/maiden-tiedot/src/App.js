import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './Filter'
import Results from './Results'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const fetchData = () => {
    axios.get('https://restcountries.eu/rest/v2/all?fields=name;capital;languages;population;flag')
      .then(res => {
        setCountries(res.data)
      })
  }

  useEffect(fetchData, [])

  const handleFilter = (event) => {
    setFilter(event.target.value.trim())
  }

  return (
    <div>
      <Filter value={filter} onChange={handleFilter} />
      <Results filter={filter} countries={countries} />
    </div>
  )
}

export default App;
