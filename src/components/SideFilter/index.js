import React, { useEffect } from 'react';

import TypeSelect from './TypeSelect';
import TypeSwitch from './TypeSwitch';
import GenSelect from './GenSelect';
import FormControl from '@mui/material/FormControl';
import './style.css';

export default function SideFilter() {
    const [hide, setHide] = React.useState(false);

    window.lixo = () => {
        setHide(false);
    }

    return (
        <>
            <div className={hide ? "controls hidden" : "controls"}>
                <div style={{ width: "100%", minWidth: 245 }}>
                    <FormControl>
                        <h1>Filters</h1>
                        <TypeSelect />
                        <TypeSwitch />
                        <GenSelect />
                    </FormControl>
                    <p>
                        "types": \
                        "bug_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 0.5, "fire": 2, "flying": 2, "ghost": 1, "grass": 0.5, "ground": 0.5, "ice": 1, "normal": 1, "poison": 1, "psychic": 1, "rock": 2, "steel": 1, "water": 1,
                        "dark_against": "bug": 2, "dark": 0.5, "dragon": 1, "electric": 1, "fairy": 2, "fighting": 2, "fire": 1, "flying": 1, "ghost": 0.5, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 1, "psychic": 0, "rock": 1, "steel": 1, "water": 1,
                        "dragon_against": "bug": 1, "dark": 1, "dragon": 2, "electric": 0.5, "fairy": 2, "fighting": 1, "fire": 0.5, "flying": 1, "ghost": 1, "grass": 0.5, "ground": 1, "ice": 2, "normal": 1, "poison": 1, "psychic": 1, "rock": 1, "steel": 1, "water": 0.5,
                        "electric_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 0.5, "fairy": 1, "fighting": 1, "fire": 1, "flying": 0.5, "ghost": 1, "grass": 1, "ground": 2, "ice": 1, "normal": 1, "poison": 1, "psychic": 1, "rock": 1, "steel": 0.5, "water": 1,
                        "fairy_against": "bug": 0.5, "dark": 0.5, "dragon": 0, "electric": 1, "fairy": 1, "fighting": 0.5, "fire": 1, "flying": 1, "ghost": 1, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 2, "psychic": 1, "rock": 1, "steel": 2, "water": 1,
                        "fighting_against": "bug": 0.5, "dark": 0.5, "dragon": 1, "electric": 1, "fairy": 2, "fighting": 1, "fire": 1, "flying": 2, "ghost": 1, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 1, "psychic": 2, "rock": 0.5, "steel": 1, "water": 1,
                        "fire_against": "bug": 0.5, "dark": 1, "dragon": 1, "electric": 1, "fairy": 0.5, "fighting": 1, "fire": 0.5, "flying": 1, "ghost": 1, "grass": 0.5, "ground": 2, "ice": 0.5, "normal": 1, "poison": 1, "psychic": 1, "rock": 2, "steel": 0.5, "water": 2,
                        "flying_against": "bug": 0.5, "dark": 1, "dragon": 1, "electric": 2, "fairy": 1, "fighting": 0.5, "fire": 1, "flying": 1, "ghost": 1, "grass": 0.5, "ground": 0, "ice": 2, "normal": 1, "poison": 1, "psychic": 1, "rock": 2, "steel": 1, "water": 1,
                        "ghost_against": "bug": 0.5, "dark": 2, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 0, "fire": 1, "flying": 1, "ghost": 2, "grass": 1, "ground": 1, "ice": 1, "normal": 0, "poison": 0.5, "psychic": 1, "rock": 1, "steel": 1, "water": 1,
                        "grass_against": "bug": 2, "dark": 1, "dragon": 1, "electric": 0.5, "fairy": 1, "fighting": 1, "fire": 2, "flying": 2, "ghost": 1, "grass": 0.5, "ground": 0.5, "ice": 2, "normal": 1, "poison": 2, "psychic": 1, "rock": 1, "steel": 1, "water": 0.5,
                        "ground_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 0, "fairy": 1, "fighting": 1, "fire": 1, "flying": 1, "ghost": 1, "grass": 2, "ground": 1, "ice": 2, "normal": 1, "poison": 0.5, "psychic": 1, "rock": 0.5, "steel": 1, "water": 2,
                        "ice_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 2, "fire": 2, "flying": 1, "ghost": 1, "grass": 1, "ground": 1, "ice": 0.5, "normal": 1, "poison": 1, "psychic": 1, "rock": 2, "steel": 2, "water": 1,
                        "normal_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 2, "fire": 1, "flying": 1, "ghost": 0, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 1, "psychic": 1, "rock": 1, "steel": 1, "water": 1,
                        "poison_against": "bug": 0.5, "dark": 1, "dragon": 1, "electric": 1, "fairy": 0.5, "fighting": 0.5, "fire": 1, "flying": 1, "ghost": 1, "grass": 0.5, "ground": 2, "ice": 1, "normal": 1, "poison": 0.5, "psychic": 2, "rock": 1, "steel": 1, "water": 1,
                        "psychic_against": "bug": 2, "dark": 2, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 0.5, "fire": 1, "flying": 1, "ghost": 2, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 1, "psychic": 0.5, "rock": 1, "steel": 1, "water": 1,
                        "rock_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 2, "fire": 0.5, "flying": 0.5, "ghost": 1, "grass": 2, "ground": 2, "ice": 1, "normal": 0.5, "poison": 0.5, "psychic": 1, "rock": 1, "steel": 2, "water": 2,
                        "steel_against": "bug": 0.5, "dark": 1, "dragon": 0.5, "electric": 1, "fairy": 0.5, "fighting": 2, "fire": 2, "flying": 0.5, "ghost": 1, "grass": 0.5, "ground": 2, "ice": 0.5, "normal": 0.5, "poison": 0, "psychic": 0.5, "rock": 0.5, "steel": 0.5, "water": 1,
                        "water_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 2, "fairy": 1, "fighting": 1, "fire": 0.5, "flying": 1, "ghost": 1, "grass": 2, "ground": 1, "ice": 0.5, "normal": 1, "poison": 1, "psychic": 1, "rock": 1, "steel": 0.5, "water": 0.5
                    </p>
                    <p>
                        "types": \
                        "bug_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 0.5, "fire": 2, "flying": 2, "ghost": 1, "grass": 0.5, "ground": 0.5, "ice": 1, "normal": 1, "poison": 1, "psychic": 1, "rock": 2, "steel": 1, "water": 1,
                        "dark_against": "bug": 2, "dark": 0.5, "dragon": 1, "electric": 1, "fairy": 2, "fighting": 2, "fire": 1, "flying": 1, "ghost": 0.5, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 1, "psychic": 0, "rock": 1, "steel": 1, "water": 1,
                        "dragon_against": "bug": 1, "dark": 1, "dragon": 2, "electric": 0.5, "fairy": 2, "fighting": 1, "fire": 0.5, "flying": 1, "ghost": 1, "grass": 0.5, "ground": 1, "ice": 2, "normal": 1, "poison": 1, "psychic": 1, "rock": 1, "steel": 1, "water": 0.5,
                        "electric_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 0.5, "fairy": 1, "fighting": 1, "fire": 1, "flying": 0.5, "ghost": 1, "grass": 1, "ground": 2, "ice": 1, "normal": 1, "poison": 1, "psychic": 1, "rock": 1, "steel": 0.5, "water": 1,
                        "fairy_against": "bug": 0.5, "dark": 0.5, "dragon": 0, "electric": 1, "fairy": 1, "fighting": 0.5, "fire": 1, "flying": 1, "ghost": 1, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 2, "psychic": 1, "rock": 1, "steel": 2, "water": 1,
                        "fighting_against": "bug": 0.5, "dark": 0.5, "dragon": 1, "electric": 1, "fairy": 2, "fighting": 1, "fire": 1, "flying": 2, "ghost": 1, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 1, "psychic": 2, "rock": 0.5, "steel": 1, "water": 1,
                        "fire_against": "bug": 0.5, "dark": 1, "dragon": 1, "electric": 1, "fairy": 0.5, "fighting": 1, "fire": 0.5, "flying": 1, "ghost": 1, "grass": 0.5, "ground": 2, "ice": 0.5, "normal": 1, "poison": 1, "psychic": 1, "rock": 2, "steel": 0.5, "water": 2,
                        "flying_against": "bug": 0.5, "dark": 1, "dragon": 1, "electric": 2, "fairy": 1, "fighting": 0.5, "fire": 1, "flying": 1, "ghost": 1, "grass": 0.5, "ground": 0, "ice": 2, "normal": 1, "poison": 1, "psychic": 1, "rock": 2, "steel": 1, "water": 1,
                        "ghost_against": "bug": 0.5, "dark": 2, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 0, "fire": 1, "flying": 1, "ghost": 2, "grass": 1, "ground": 1, "ice": 1, "normal": 0, "poison": 0.5, "psychic": 1, "rock": 1, "steel": 1, "water": 1,
                        "grass_against": "bug": 2, "dark": 1, "dragon": 1, "electric": 0.5, "fairy": 1, "fighting": 1, "fire": 2, "flying": 2, "ghost": 1, "grass": 0.5, "ground": 0.5, "ice": 2, "normal": 1, "poison": 2, "psychic": 1, "rock": 1, "steel": 1, "water": 0.5,
                        "ground_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 0, "fairy": 1, "fighting": 1, "fire": 1, "flying": 1, "ghost": 1, "grass": 2, "ground": 1, "ice": 2, "normal": 1, "poison": 0.5, "psychic": 1, "rock": 0.5, "steel": 1, "water": 2,
                        "ice_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 2, "fire": 2, "flying": 1, "ghost": 1, "grass": 1, "ground": 1, "ice": 0.5, "normal": 1, "poison": 1, "psychic": 1, "rock": 2, "steel": 2, "water": 1,
                        "normal_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 2, "fire": 1, "flying": 1, "ghost": 0, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 1, "psychic": 1, "rock": 1, "steel": 1, "water": 1,
                        "poison_against": "bug": 0.5, "dark": 1, "dragon": 1, "electric": 1, "fairy": 0.5, "fighting": 0.5, "fire": 1, "flying": 1, "ghost": 1, "grass": 0.5, "ground": 2, "ice": 1, "normal": 1, "poison": 0.5, "psychic": 2, "rock": 1, "steel": 1, "water": 1,
                        "psychic_against": "bug": 2, "dark": 2, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 0.5, "fire": 1, "flying": 1, "ghost": 2, "grass": 1, "ground": 1, "ice": 1, "normal": 1, "poison": 1, "psychic": 0.5, "rock": 1, "steel": 1, "water": 1,
                        "rock_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 1, "fairy": 1, "fighting": 2, "fire": 0.5, "flying": 0.5, "ghost": 1, "grass": 2, "ground": 2, "ice": 1, "normal": 0.5, "poison": 0.5, "psychic": 1, "rock": 1, "steel": 2, "water": 2,
                        "steel_against": "bug": 0.5, "dark": 1, "dragon": 0.5, "electric": 1, "fairy": 0.5, "fighting": 2, "fire": 2, "flying": 0.5, "ghost": 1, "grass": 0.5, "ground": 2, "ice": 0.5, "normal": 0.5, "poison": 0, "psychic": 0.5, "rock": 0.5, "steel": 0.5, "water": 1,
                        "water_against": "bug": 1, "dark": 1, "dragon": 1, "electric": 2, "fairy": 1, "fighting": 1, "fire": 0.5, "flying": 1, "ghost": 1, "grass": 2, "ground": 1, "ice": 0.5, "normal": 1, "poison": 1, "psychic": 1, "rock": 1, "steel": 0.5, "water": 0.5
                    </p>
                </div>
            </div>
            <div className="controls-toggle">
                <div className='controls-toggle-inner noselect vertical-text'
                    onClick={() => setHide(!hide)}><span>Filters</span> <span>Team Builder</span></div>
            </div>
        </>
    );
}
