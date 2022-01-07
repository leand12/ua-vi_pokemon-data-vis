import React from 'react'
import { getTypeData, getStatsCorrelationData, loadTypeHeatmap } from 'utils/heatMap'
import data from "archive/pokemon.json";

export default function ChartHeatmap() {


    React.useEffect(() => {
        //let [ndata, types, atributes] = getTypeData(data.pokemons)
        let [ndata, types, atributes] = getStatsCorrelationData(data.pokemons)
        loadTypeHeatmap(ndata, types, atributes);

    }, [])

    return (
            <div id="heatmap-div" >
                <svg className='charts-heatmap'></svg>
            </div>
    )
}
