import React from 'react';
import { loadRadar } from "utils/radarChart";
import { filterData } from "utils/typeRelation";
import data from "archive/pokemon.json";


export default function ChartRadar() {
    React.useEffect(() => {
        let a = [
            {
                className: 'pikachu', // optional, can be used for styling
                axes: [
                    { axis: "hp", value: 255 },
                    { axis: "attack", value: 50 },
                    { axis: "defense", value: 100 },
                    { axis: "special attack", value: 90 },
                    { axis: "special defense", value: 20 },
                    { axis: "speed", value: 20 }
                ],
            },
            {
                className: 'lixo', // optional, can be used for styling
                axes: [
                    { axis: "hp", value: 20},
                    { axis: "attack", value: 100 },
                    { axis: "defense", value: 30 },
                    { axis: "special attack", value: 255 },
                    { axis: "special defense", value: 85 },
                    { axis: "speed", value: 85 }
                ]
            },
        ];
        loadRadar(a);
    }, []);

    return (
        <svg className="radar-chart">
        </svg>
    );
}
