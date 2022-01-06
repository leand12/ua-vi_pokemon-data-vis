import React from 'react';
import { loadScatterPlot } from 'utils/scatterPlot';
import data from "archive/pokemon.json";
import useFilterStore from 'stores/useFilterStore';
import InfoCard from 'components/InfoCard';
import useCompareStore from 'stores/useCompareStore';

// https://medium.com/codex/an-interactive-scatter-plot-e5a01064b17
export default function ChartScatter() {
    
    const pokemons = useFilterStore(state => state.pokemonsTR);
    const filters = useFilterStore(state => state.filters);

    React.useEffect(() => {
        loadScatterPlot(pokemons, "attack", "defense");
    }, [pokemons, filters]);

    return (
        <div style={{marginLeft: "100px"}}>
            <svg viewBox='0 0 1000 1000' className="scatter-chart">
            </svg>
            <InfoCard comparable={true} type={"selected"}/>
        </div>
    );
}
