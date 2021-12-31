import React from 'react';
import { loadRadar } from "utils/radarChart";
import { filterData } from "utils/typeRelation";
import data from "archive/pokemon.json";


export default function ChartRadar() {
    React.useEffect(() => {
        loadRadar([data.pokemons[2], data.pokemons[1]]);
    }, []);

    return (
        <svg className="radar-chart">
        </svg>
    );
}
