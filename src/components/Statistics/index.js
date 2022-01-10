import React from 'react';

import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './style.css';
import ChartBar from 'components/Charts/ChartBar';
import ChartLine from 'components/Charts/ChartLine';
import ChartHeatmap from 'components/Charts/ChartHeatmap';

export default function Charts({ changePage }) {

    return (
        <div className="statistics">
            <Button sx={{ m: 4, width: 200 }} variant="outlined" startIcon={<ArrowBackIcon />} onClick={changePage}>
                Team Planner
            </Button>

            <div style={{ display: "flex", direction: "row", justifyContent: "space-around" }}>
                <div>
                    <h2>Pokemon Stats Tendencies</h2>
                    <ChartLine />
                </div>
                <div>
                    <h2>Generation Statistics</h2>
                    <ChartBar />
                </div>
            </div>
            <div style={{ padding: "0 112px 43px 112px" }}>
                <hr style={{ border: "1px solid lightgray", height: 1 }} />
            </div>
            <div style={{ display: "flex", direction: "row", justifyContent: "space-evenly" }}>
                <div>
                    <h2 style={{ paddingLeft: 50 }}>Pokemon Stats Tendencies</h2>
                    <ChartHeatmap />
                </div><div>
                    <h2 style={{ paddingLeft: 50 }}>Pokemon Stats Tendencies</h2>
                    <ChartHeatmap stats />
                </div>
            </div>
        </div>
    )
}


