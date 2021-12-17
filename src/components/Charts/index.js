import React from 'react';

import ChartRandom from './ChartRandom';
import ChartTypeRelation from './ChartTypeRelation';
import './style.css';

export default function Charts() {

    return (
        <div className="charts">
            <ChartTypeRelation />
            <ChartRandom />
        </div>
    )
}