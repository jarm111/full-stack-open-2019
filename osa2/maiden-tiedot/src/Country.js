import React from 'react'

const Country = ({country}) => {
  const {name, capital, population, languages, flag} = country

  return (
    <div>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <h3>languages</h3>
      <ul>{languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
      <img src={flag} alt={`${name} flag`} style={{maxWidth: 150}}/>
    </div>
  )
}

export default Country
