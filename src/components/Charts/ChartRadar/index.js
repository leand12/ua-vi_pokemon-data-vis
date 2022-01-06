import React from 'react';
import { loadRadar } from "utils/radarChart";
import data from "archive/pokemon.json";
import useCompareStore from 'stores/useCompareStore';


export default function ChartRadar() {

    const compare1 = useCompareStore(state => state.compare1);
    const compare2 = useCompareStore(state => state.compare2);
    React.useEffect(() => {
        loadRadar([compare1, compare2]);
    }, [compare1, compare2]);

    return (
        <svg className="radar-chart">
        </svg>
    );
}
