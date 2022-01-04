import React from 'react';
import ChartRadar from './ChartRadar';

import ChartRandom from './ChartRandom';
import ChartScatter from './ChartScatter';
import ChartTypeRelation from './ChartTypeRelation';
import './style.css';

export default function Charts() {

    return (
        <div className="charts">
            <ChartTypeRelation />
            <ChartRandom />
            <ChartRadar />
            <ChartScatter />
        </div>
    )
}