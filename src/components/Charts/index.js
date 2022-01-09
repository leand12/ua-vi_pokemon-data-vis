import React from 'react';
import ChartRadar from './ChartRadar';

import ChartScatter from './ChartScatter';
import ChartTypeRelation from './ChartTypeRelation';
import ChartBar from './ChartBar';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './style.css';

export default function Charts({ changePage }) {

    return (
        <div className="charts">
            <Button sx={{ m: 4, width: 200, marginLeft: "auto" }} variant="outlined" endIcon={<ArrowForwardIcon />} onClick={changePage}>
                Statistics
            </Button>
            <ChartTypeRelation />
            <ChartScatter />
            <ChartRadar />
        </div>
    )
}
