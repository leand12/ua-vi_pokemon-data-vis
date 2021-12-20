import React from 'react';

export default function ChartRandom() {

    return (
        <svg viewBox="0 0 10 10">
            <defs>
                <circle id="circle" cx="5" cy="5" r="4" strokeWidth="0.5" fill="transparent" />
            </defs>
            <use href="#circle" stroke="pink" strokeDasharray="20" />
        </svg>
    );
}
