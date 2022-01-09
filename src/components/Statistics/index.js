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

            <ChartLine />
            <ChartBar />
            <ChartHeatmap />
            <ChartHeatmap stats />
        </div>
    )
}


