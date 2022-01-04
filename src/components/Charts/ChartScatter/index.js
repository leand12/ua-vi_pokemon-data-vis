import React from 'react';
import { loadScatterPlot } from 'utils/scatterPlot';
import data from "archive/pokemon.json";
import useFilterStore from 'stores/useFilterStore';

// https://medium.com/codex/an-interactive-scatter-plot-e5a01064b17
export default function ChartScatter() {
    
    const pokemons = useFilterStore(state => state.pokemonsTR);
    const filters = useFilterStore(state => state.filters);

    React.useEffect(() => {
        loadScatterPlot(pokemons, "attack", "defense");
        console.log("use effect")
    }, [pokemons, filters]);

    return (
        <div style={{margin: "100px"}}>
            <svg className="scatter-chart">
            </svg>
        </div>
    );
}
