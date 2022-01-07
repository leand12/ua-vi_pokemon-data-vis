import React from 'react';
import { loadRadar } from "utils/radarChart";
import useCompareStore from 'stores/useCompareStore';
import Grid from '@mui/material/Grid';
import InfoCard from 'components/InfoCard';

export default function ChartRadar() {

    const compare1 = useCompareStore(state => state.compare1);
    const compare2 = useCompareStore(state => state.compare2);

    React.useEffect(() => {
        loadRadar([compare1, compare2]);
    }, [compare1, compare2]);

    return (
        <div style={{marginBottom: 8}}>
            <h1>Pokemon Comparison</h1>
            <Grid container className="container-area">
                <Grid container justifyContent="center" alignItems="center">
                    <svg className="radar-chart"></svg>
                </Grid>
                <Grid container direction="row" justifyContent="space-evenly">
                    <InfoCard comparable={false} type={"compare1"} />
                    <InfoCard comparable={false} type={"compare2"} />
                </Grid>

            </Grid>
        </div>
    );
}
