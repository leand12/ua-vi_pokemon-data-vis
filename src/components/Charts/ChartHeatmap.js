import React from 'react'
import { getTypeData, getStatsCorrelationData, loadTypeHeatmap } from 'utils/heatMap';
import data from "archive/pokemon.json";

export default function ChartHeatmap({ stats }) {


    React.useEffect(() => {
        let [ndata, types, atributes] = stats ?
            getStatsCorrelationData(data.pokemons) :
            getTypeData(data.pokemons);
        loadTypeHeatmap(ndata, types, atributes, stats ? "heatmap-div-stats" : "heatmap-div-types");
    }, [])

    return (
        <div id={stats ? "heatmap-div-stats" : "heatmap-div-types"} >
            <svg className='charts-heatmap'></svg>
        </div>
    )
}
