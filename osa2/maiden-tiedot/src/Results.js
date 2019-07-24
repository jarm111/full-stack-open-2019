import React from 'react'
import Country from './Country'
import Countries from './Countries'

const Results = ({filter, countries, onShow}) => {
  const filtered = countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
  const len = filtered.length

  if (len > 10) return <div>Too many matches, specify another filter</div>
  if (len > 1) return <Countries countries={filtered} onShow={onShow}/>
  if (len === 1) return <Country country={filtered[0]} />
  return <div>No match</div>
}

export default Results
