import React from 'react';
import ChartRadar from './ChartRadar';

import ChartScatter from './ChartScatter';
import ChartTypeRelation from './ChartTypeRelation';
import './style.css';

export default function Charts() {

    return (
        <div className="charts">
            <ChartTypeRelation />
            <ChartScatter />
            <ChartRadar />
        </div>
    )
}