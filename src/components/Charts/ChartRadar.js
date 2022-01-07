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
        <div style={{ marginBottom: 8 }}>
            <h1>Pokemon Comparison</h1>
            <Grid container className="container-area">
                <Grid item md={12} lg={7} style={{ width: "100%", textAlign: "center" }}>
                    <svg className="radar-chart" viewBox='0 0 700 700'></svg>
                </Grid>
                <Grid item md={12} lg={5} style={{ width: "100%" }}>
                    <Grid container direction="row" justifyContent="space-evenly">
                        <Grid item sm={12} md={6} lg={12} style={{display: "flex", justifyContent: "center"}}>
                            <InfoCard comparable={false} type={"compare1"} />
                        </Grid>
                        <Grid item sm={12} md={6} lg={12} style={{display: "flex", justifyContent: "center"}}>
                            <InfoCard comparable={false} type={"compare2"} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
