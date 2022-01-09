import React, { useEffect } from 'react';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import useFilterStore from 'stores/useFilterStore';
import {
    transformData,
    initializeDisplay,
    initializeSimulation,
    changeOpacity
} from 'utils/typeRelation';

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
        <div>
            <h1>Type Relation</h1>
            {/* <div className="btn-zoom" style={{top: "calc(2.5em + 10px)", right: "calc(10px + 8px)"}}>
                <ZoomInIcon />
                <ZoomOutIcon />
            </div> */}
            <svg className="type-relation container-area" viewBox='0 0 900 900'>
                <defs>
                    <linearGradient id="fadeGrad" y2="1" x2="0">
                        <stop offset="0" stopColor="white" stopOpacity="0" />
                        <stop offset="0.3" stopColor="white" stopOpacity="1" />
                    </linearGradient>

                    <mask id="fade" maskContentUnits="objectBoundingBox">
                        <rect width="1" height="1" fill="url(#fadeGrad)" />
                    </mask>
                </defs>
                <g className="zoom">
                    <g className="links"></g>
                    <g className="nodes"></g>
                    <g className="nodes-half"></g>
                    <g className="nodes-text noselect"></g>
                </g>
            </svg>
        </div>
    );
}