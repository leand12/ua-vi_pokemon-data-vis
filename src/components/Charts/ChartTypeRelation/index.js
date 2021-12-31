import React, { useEffect } from 'react';

import * as d3 from "d3";

import useFilterStore from 'stores/useFilterStore';
import {
    transformData, 
    initializeDisplay, 
    initializeSimulation,
    changeOpacity } from 'utils/typeRelation';
import './style.css';

export default function ChartTypeRelation() {

    const pokemons = useFilterStore(state => state.pokemonsTR);
    const filters = useFilterStore(state => state.filters);

    useEffect(() => {
        transformData(pokemons);
        initializeDisplay();
        initializeSimulation();
        changeOpacity();
    }, [pokemons]);

    useEffect(() => {
        changeOpacity();
    }, [filters.types, filters.typesSelection]);

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