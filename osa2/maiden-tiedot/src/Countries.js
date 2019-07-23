import React from 'react'

const Countries = ({countries}) => {
  return (
    <div>
      {countries.map(c => <div key={c.name}>{c.name}</div>)}
    </div>
  )
}

export default Countries
