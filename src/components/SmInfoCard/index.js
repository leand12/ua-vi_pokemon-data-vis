import React from 'react';
import { type_images } from "utils/globals"
import { Grid, Button } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import "./style.css";
import useCompareStore from 'stores/useCompareStore';

export default function SmInfoCard({ pokemon, highlighted, onTeam }) {

    const [selected, setSelected] = React.useState(false);

    const getImage = (name) => {
        name = name.replaceAll(" ", "-");
        name = name.replaceAll(".", "");
        name = name.replaceAll(":", "");
        name = name.replaceAll("♀", "-f");
        name = name.replaceAll("♂", "-m");
        name = name.replaceAll("é", "e");
        name = name.replaceAll("'", "");
        name = name.toLowerCase();
        return "https://img.pokemondb.net/artwork/" + name + ".jpg";
    };

    const mouseOverHandler = () => {
        setSelected(!selected);
    }

    const mouseOutHandler = () => {
        setSelected(false);
    }

    const addToCompare = (pos) => {
        if (pos == 1)
            useCompareStore.getState().setCompare1(pokemon);
        else if (pos == 2)
            useCompareStore.getState().setCompare2(pokemon);
    }

    const addToTeam = (pokemon) => {
        useCompareStore.getState().setTeam(pokemon);
    }

    const removeFromTeam = (pokedex_number) => {
        useCompareStore.getState().removeTeam(pokedex_number);
    }

    return (
        <Grid container direction="row" className="exterior" alignItems="center" style={{ borderColor: highlighted ? "gold" : "gray" }}
            onMouseEnter={mouseOverHandler} onMouseLeave={mouseOutHandler}>

            <Grid item md={2} style={{ textAlign: "center" }}>
                <img src={getImage(pokemon.name)}></img>
            </Grid>
            <Grid item md={10}>
                <Grid container alignItems="center">
                    {!selected ?
                        <>
                            <Grid item md={9} style={{ textAlign: "left", paddingLeft: 8 }}>
                                {pokemon.name} <br></br>#{pokemon.pokedex_number}
                            </Grid>
                            <Grid item md={3}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <img src={type_images[pokemon.type1]}></img>
                                    {
                                        pokemon.type2 ? <img src={type_images[pokemon.type2]}></img> : <></>
                                    }
                                </div>
                            </Grid>
                        </> : <div style={{ marginLeft: "auto" }}>
                            <IconButton aria-label="add to compare one" sx={{ color: "rgb(204, 51, 63)" }}
                                onClick={() => addToCompare(1)}>
                                <LooksOneIcon />
                            </IconButton>
                            <IconButton aria-label="add to compare two" sx={{ color: "rgb(237, 201, 81)" }}
                                onClick={() => addToCompare(2)}>
                                <LooksTwoIcon />
                            </IconButton>

                            {onTeam ?
                                <IconButton aria-label="remove from team"
                                    onClick={() => removeFromTeam(pokemon.pokedex_number)}>
                                    <DisabledByDefaultIcon />
                                </IconButton> :
                                <IconButton aria-label="add to team" variant="contained"
                                    onClick={() => addToTeam(pokemon)}>
                                    <AddBoxIcon />
                                </IconButton>
                            }
                        </div>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}
