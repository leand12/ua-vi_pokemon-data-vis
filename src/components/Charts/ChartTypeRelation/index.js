import React, { useEffect } from 'react';

import * as d3 from "d3";

import {
    transformData, 
    initializeDisplay, 
    initializeSimulation } from 'utils/typeRelation';
import data from "archive/pokemon.json";
import './style.css';

export default function ChartTypeRelation() {

    useEffect(() => {
        transformData(data);
        initializeDisplay();
        initializeSimulation();
    }, []);

    return (
        <svg className="type-relation">
            <defs>
                <linearGradient id="fadeGrad" y2="1" x2="0">
                    <stop offset="0" stopColor="white" stopOpacity="0" />
                    <stop offset="0.3" stopColor="white" stopOpacity="1" />
                </linearGradient>

                <mask id="fade" maskContentUnits="objectBoundingBox">
                    <rect width="1" height="1" fill="url(#fadeGrad)" />
                </mask>
            </defs>
        </svg>
    );
}