import React from 'react'
import Show from './Show'

const Countries = ({countries, onShow}) => {
  return (
    <div>
      {countries.map((c, i) => 
        <div key={c.name}>
          {c.name} 
          <Show onShow={() => onShow(c.name)}/>
        </div>)}
    </div>
  )
}

export default Countries
