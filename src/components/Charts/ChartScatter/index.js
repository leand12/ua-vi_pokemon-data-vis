import React from 'react';
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { loadScatterPlot, initScatterPlot } from 'utils/scatterPlot';
import useFilterStore from 'stores/useFilterStore';
import InfoCard from 'components/InfoCard';
import useCompareStore from 'stores/useCompareStore';

// https://medium.com/codex/an-interactive-scatter-plot-e5a01064b17
export default function ChartScatter() {

    const pokemons = useFilterStore(state => state.pokemonsTR);
    const filters = useFilterStore(state => state.filters);

    const [xAxis, setXAxis] = React.useState("attack");
    const [yAxis, setYAxis] = React.useState("defense");

    const handleChangeX = (event) => {
        setXAxis(event.target.value);
    }

    const handleChangeY = (event) => {
        setYAxis(event.target.value);
    }

    React.useEffect(() => {
        initScatterPlot();
    }, [])

    React.useEffect(() => {
        loadScatterPlot(pokemons, xAxis, yAxis);
    }, [pokemons, filters, xAxis, yAxis]);

    return (
        <div style={{marginLeft: "100px"}}>
            <FormControl   style={{ position: 'relative', margin: '1.5em 0' }}>
                <InputLabel id="yAxis-label">Y axis</InputLabel>
                <Select
                    labelId="yAxis-label"
                    id="yAxis-select"
                    value={yAxis}
                    label="Y axis"
                    onChange={handleChangeY}
                >
                    <MenuItem value={"attack"}>Attack</MenuItem>
                    <MenuItem value={"defense"}>Defense</MenuItem>
                    <MenuItem value={"sp_attack"}>Special Attack</MenuItem>
                    <MenuItem value={"sp_defense"}>Special Defense</MenuItem>
                    <MenuItem value={"hp"}>Health</MenuItem>
                    <MenuItem value={"speed"}>Speed</MenuItem>

                </Select>
            </FormControl>
            <svg viewBox='0 0 300 300' className="scatter-chart" style={{width:"50%"}}>
            </svg>
            <FormControl style={{ position: 'relative', margin: '1.5em 0'}} >
                <InputLabel id="xAxis-label">X axis</InputLabel>
                <Select
                    labelId="xAxis-label"
                    id="xAxis-select"
                    value={xAxis}
                    label="X axis"
                    onChange={handleChangeX}
                >
                    <MenuItem value={"attack"}>Attack</MenuItem>
                    <MenuItem value={"defense"}>Defense</MenuItem>
                    <MenuItem value={"sp_attack"}>Special Attack</MenuItem>
                    <MenuItem value={"sp_defense"}>Special Defense</MenuItem>
                    <MenuItem value={"hp"}>Health</MenuItem>
                    <MenuItem value={"speed"}>Speed</MenuItem>

                </Select>
            </FormControl>
            <InfoCard comparable={true} type={"selected"}/>
        </div>
    );
}
