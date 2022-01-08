import React, { useEffect } from 'react';

import TypeSelect from './TypeSelect';
import TypeSwitch from './TypeSwitch';
import GenSelect from './GenSelect';
import FormControl from '@mui/material/FormControl';
import './style.css';
import TeamBuilder from 'components/TeamBuilder';


export default function SideFilter() {
    const [hide, setHide] = React.useState(false);

    window.lixo = () => {
        setHide(false);
    }

    return (
        <>
            <div className={hide ? "controls hidden" : "controls"}>
                <FormControl sx={{ m: 1 }} >
                    <h1>Filters</h1>
                    <TypeSelect />
                    <TypeSwitch />
                    <GenSelect />
                    <TeamBuilder />
                </FormControl>
            </div>
            <div className="controls-toggle">
                <div className='noselect vertical-text' onClick={() => setHide(!hide)}>Filters</div>
            </div>
        </>
    );
}
