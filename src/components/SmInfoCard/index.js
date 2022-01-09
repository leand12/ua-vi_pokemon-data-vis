import React from 'react';
import {type_images} from "utils/globals"
import { Grid, Button } from '@mui/material';
import "./style.css"
import useCompareStore from 'stores/useCompareStore';

export default function SmInfoCard(props) {


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
        setSelected(true);
    }

    const mouseOutHandler = () => {
        setSelected(false);
    }


    const addToCompare = (pos) => {
        if (pos == 1)
            useCompareStore.getState().setCompare1(props.pokemon);
        else if (pos == 2)
            useCompareStore.getState().setCompare2(props.pokemon);
    }

    const addToTeam = (pokemon) => {
        useCompareStore.getState().setTeam(pokemon);
    }

    const removeFromTeam = (pokedex_number) => {
        useCompareStore.getState().removeTeam(pokedex_number);
    }

    React.useEffect(() => {
        
    }, [props.highlighted, props.onTeam]);

    return (
        <Grid onMouseOver={()=> mouseOverHandler()} onMouseLeave={() => mouseOutHandler()} className="exterior" style={{borderColor: props.highlighted ? "gold" : "gray"}}container direction="row">
            { !selected ? 
            <>
                <Grid item md={2}>
                    <img src={getImage(props.pokemon.name)}></img>
                </Grid>
                
                <Grid item md={7}>
                    {props.pokemon.name} #{props.pokemon.pokedex_number}
                </Grid>
                <Grid item md={3}>
                    <img src={type_images[props.pokemon.type1]}></img>
                    {
                        props.pokemon.type2 ? <img src={type_images[props.pokemon.type2]}></img> : <></>
                    }
                </Grid>
            </>
            :
            <>
               <Grid  onClick={() => addToCompare(1)} style={{marginRight: "15%"}}  item >
                    <Button style={{backgroundColor: "blue", color: "white"}}  className="action_button" >C1</Button>
                </Grid> 
                <Grid onClick={() => addToCompare(2)} style={{marginRight: "15%"}}  item >
                    <Button style={{backgroundColor: "orange", color: "white"}} className="action_button" >C2</Button>
                </Grid> 
                { props.onTeam ? 
                <Grid item >
                    <Button onClick={() => removeFromTeam(props.pokemon.pokedex_number)} style={{backgroundColor: "red", color: "white"}} className="action_button">X</Button>
                </Grid> 
                :
                <Grid item >
                    <Button onClick={() => addToTeam(props.pokemon)} style={{backgroundColor: "green", color: "white"}} className="action_button">+</Button>
                </Grid>
                }
            </> 
            }
        </Grid>
    )
}
