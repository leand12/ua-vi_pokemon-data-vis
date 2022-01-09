import React from 'react'
import { loadLineChart } from 'utils/lineChart'
import data from "archive/pokemon.json"

export default function ChartLine() {
    
    React.useEffect(()=> {
        loadLineChart(data.pokemons)
    }, [])

    return (
        <div>
            <svg className='charts-line'></svg>
        </div>
    )
}
