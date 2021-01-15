import React, { useState, useEffect } from 'react'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

const url = '/states-10m.json'

const proj = geoAlbersUsa()
  .scale(1300)
  .translate([487.5, 305])


const USMap = ({ ...mapProps }) => {
  const [geography, setGeography] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw Error(`Looks like there was a problem. Status Code: ${res.status}`)
        }
        const mapData = await res.json()
        setGeography(feature(mapData, mapData.objects.states).features)
        
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()

  }, [])

  return (
    <svg {...mapProps} viewBox='0 0 975 610'>
      <g className='us'>
        {
          geography.map((d,i) => (
            <path
              key={ `path-${ i }` }
              d={ geoPath().projection(proj)(d) }
              fill='#ccc'
              stroke='#fff'
              strokeWidth={ 1 }
            />
          ))
        }
      </g>
    </svg>
  )
  
}

export default USMap
