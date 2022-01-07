import React from 'react'
import data from "archive/pokemon.json";
import "./style.css"

export default function TypeTable(props) {
    
    /*
        props.types = List[String]; // each string is the name of a type
    */

    const colors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const valuesColors = (value) => {
        if(value == 0.5)
            return "#a40000";
        if (value == 0.25)
            return "#7c0000"
        if (value == 2)
            return "#4e9a06"
        if(value == 4)
            return "#73d216"
        if(value == 0)
            return "black"
        if(value == 1)
            return "#f0f0f0"
    }

    const valueToString = (value) => {
        if(value == 0.5)
            return "½";
        if (value == 0.25)
            return "¼"
        
        return value;
    } 

    let [weaknesses, setWeaknesses] = React.useState({});

    React.useEffect(() => {
        let temp = {};
        for(let type of props.types) {
            
            if(!type.length)
                continue

            if(Object.keys(temp).length == 0) {
                temp = {...data.types[type + "_against"]}
            }
            else {
                for(let key of Object.keys(temp)) {
                    temp[key] *= data.types[type + "_against"][key]
                }
            }
        }
        console.log(temp)
        setWeaknesses(temp)
    }, [props.types])
    
    return (
        Object.keys(weaknesses).length != 0 ? 
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th style={{backgroundColor : colors["bug"]}}>Bug</th>
                            <th style={{backgroundColor : colors["dark"]}}>Dar</th>
                            <th style={{backgroundColor : colors["dragon"]}}>Dra</th>
                            <th style={{backgroundColor : colors["electric"]}}>Ele</th>
                            <th style={{backgroundColor : colors["fairy"]}}>Fai</th>
                            <th style={{backgroundColor : colors["fighting"]}}>Fig</th>
                            <th style={{backgroundColor : colors["fire"]}}>Fir</th>
                            <th style={{backgroundColor : colors["flying"]}}>Fly</th>
                            <th style={{backgroundColor : colors["ghost"]}}>Gho</th>
                        </tr>
                        <tr className='values'>
                            <th style={{backgroundColor: valuesColors(weaknesses["bug"])}}>{valueToString(weaknesses["bug"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["dark"])}}>{valueToString(weaknesses["dark"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["dragon"])}}>{valueToString(weaknesses["dragon"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["electric"])}}>{valueToString(weaknesses["electric"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["fairy"])}}>{valueToString(weaknesses["fairy"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["fighting"])}}>{valueToString(weaknesses["fighting"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["fire"])}}>{valueToString(weaknesses["fire"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["flying"])}}>{valueToString(weaknesses["flying"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["ghost"])}}>{valueToString(weaknesses["ghost"])}</th>
                            
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th style={{backgroundColor : colors["grass"]}}>Gra</th>
                            <th style={{backgroundColor : colors["ground"]}}>Gro</th>
                            <th style={{backgroundColor : colors["ice"]}}>Ice</th>
                            <th style={{backgroundColor : colors["normal"]}}>Nor</th>
                            <th style={{backgroundColor : colors["poison"]}}>Poi</th>
                            <th style={{backgroundColor : colors["psychic"]}}>Psy</th>
                            <th style={{backgroundColor : colors["rock"]}}>Roc</th>
                            <th style={{backgroundColor : colors["steel"]}}>Ste</th>
                            <th style={{backgroundColor : colors["water"]}}>Wat</th>
                        </tr>
                        <tr className='values'>
                            <th style={{backgroundColor: valuesColors(weaknesses["grass"])}}>{valueToString(weaknesses["grass"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["ground"])}}>{valueToString(weaknesses["ground"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["ice"])}}>{valueToString(weaknesses["ice"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["normal"])}}>{valueToString(weaknesses["normal"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["poison"])}}>{valueToString(weaknesses["poison"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["psychic"])}}>{valueToString(weaknesses["psychic"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["rock"])}}>{valueToString(weaknesses["rock"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["steel"])}}>{valueToString(weaknesses["steel"])}</th>
                            <th style={{backgroundColor: valuesColors(weaknesses["water"])}}>{valueToString(weaknesses["water"])}</th>
                        </tr>
                    </tbody>
                </table>


            </div> 
            : <></>
    )
}
