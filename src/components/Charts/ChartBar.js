import React from 'react'
import {loadBarChartGenerations} from "utils/barChart"
import data from "archive/pokemon.json"

export default function ChartBar() {

    React.useEffect(() => {
        loadBarChartGenerations(data.pokemons)

    }, []);

    return (
        <div style={{marginBottom: "100px"}}>
            <svg className="charts-bar"></svg>
        </div>
    )
}
