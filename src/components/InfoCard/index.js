import React from 'react';
import { Button, Grid, Card } from '@mui/material';
import useCompareStore from 'stores/useCompareStore';
import "./style.css";

export default function InfoCard(props) {

    const pokemon = useCompareStore(state => state[props.type]);

    //const pokemon = {"attack": 47, "defense": 52, "hp": 55, "name": "Nidoran♂", "pokedex_number": 29, "sp_attack": 40, "sp_defense": 40, "speed": 41, "type1": "poison", "type2": "", "generation": 1, "is_legendary": 0}

    const getImage = (name) => {
        name = name.replace(" ", "-");
        name = name.replace(".", "");
        name = name.replace(":", "");
        name = name.replace("♀", "-f");
        name = name.replace("♂", "-m");
        name = name.replace("é", "e");
        name = name.replace("'", "");
        name = name.toLowerCase();
        return "https://img.pokemondb.net/artwork/" + name + ".jpg";
    }

    const addToCompare = (pos) => {
        if (pos == 1)
            useCompareStore.getState().setCompare1(pokemon);
        else if (pos == 2)
            useCompareStore.getState().setCompare2(pokemon);
    }

    return (
        Object.keys(pokemon).length ?
            <Card variant="outlined" className="card-info" style={{textAlign: "center"}}>
                <h2>{pokemon.name} #{pokemon.pokedex_number}</h2>
                <img src={getImage(pokemon.name)} style={{ width: "200px", height: "200px" }}></img>

                <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                        <span>Attack: {pokemon.attack}</span>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <span>Defense: {pokemon.defense}</span>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <span>Special Attack: {pokemon.sp_attack}</span>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <span>Special Defense: {pokemon.sp_defense}</span>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <span>Health: {pokemon.hp}</span>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <span>Speed: {pokemon.speed}</span>
                    </Grid>
                </Grid>

                {props.comparable ?
                    <div style={{ margin: "8px auto" }}>
                        <Button style={{margin: 8, backgroundColor: "rgb(204, 51, 63)"}} variant="contained" onClick={() => { addToCompare(1) }}> Select for Compare 1</Button>
                        <Button style={{margin: 8, backgroundColor: "rgb(237, 201, 81)" }} variant="contained" onClick={() => { addToCompare(2) }}> Select for Compare 2</Button>
                    </div> : <></>
                }
            </Card>
            : <></>
    )
}
