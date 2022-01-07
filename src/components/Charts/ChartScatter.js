import React from 'react';
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { loadScatterPlot, initScatterPlot, changeColors } from 'utils/scatterPlot';
import useFilterStore from 'stores/useFilterStore';
import InfoCard from 'components/InfoCard';
import useCompareStore from 'stores/useCompareStore';
import Grid from '@mui/material/Grid';

// https://medium.com/codex/an-interactive-scatter-plot-e5a01064b17
export default function ChartScatter() {

    const pokemons = useFilterStore(state => state.pokemonsTR);

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
        useCompareStore.subscribe(changeColors, state => state);
    }, [])

    React.useEffect(() => {
        loadScatterPlot(pokemons, xAxis, yAxis);
    }, [pokemons, xAxis, yAxis]);

    return (
        <div>
            <h1>Status Relation</h1>
            <Grid container className="container-area">
                <Grid item md={12} lg={7} style={{ width: "100%", textAlign: "center"}}>
                        <svg className="scatter-chart" viewBox='0 0 300 300'></svg>
                </Grid>
                <Grid item md={12} lg={5} style={{ width: "100%" }}>
                    <Grid container justifyContent="center">
                        <Grid container direction="row" justifyContent="space-evenly">
                            <FormControl style={{ position: 'relative', margin: '1.5em 0' }}>
                                <InputLabel id="yAxis-label">Y axis</InputLabel>
                                <Select
                                    labelId="yAxis-label"
                                    id="yAxis-select"
                                    value={yAxis}
                                    label="Y axis"
                                    onChange={handleChangeY}
                                    sx={{ width: 170 }}
                                >
                                    <MenuItem value={"attack"}>Attack</MenuItem>
                                    <MenuItem value={"defense"}>Defense</MenuItem>
                                    <MenuItem value={"sp_attack"}>Special Attack</MenuItem>
                                    <MenuItem value={"sp_defense"}>Special Defense</MenuItem>
                                    <MenuItem value={"hp"}>Health</MenuItem>
                                    <MenuItem value={"speed"}>Speed</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{ position: 'relative', margin: '1.5em 0' }} >
                                <InputLabel id="xAxis-label">X axis</InputLabel>
                                <Select
                                    labelId="xAxis-label"
                                    id="xAxis-select"
                                    value={xAxis}
                                    label="X axis"
                                    onChange={handleChangeX}
                                    sx={{ width: 170 }}
                                >
                                    <MenuItem value={"attack"}>Attack</MenuItem>
                                    <MenuItem value={"defense"}>Defense</MenuItem>
                                    <MenuItem value={"sp_attack"}>Special Attack</MenuItem>
                                    <MenuItem value={"sp_defense"}>Special Defense</MenuItem>
                                    <MenuItem value={"hp"}>Health</MenuItem>
                                    <MenuItem value={"speed"}>Speed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <InfoCard comparable={true} type={"selected"} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
