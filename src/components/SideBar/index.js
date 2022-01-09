import React from 'react';

import Filters from "./Filters";
import './style.css';
import TeamBuilderBar from './TeamBuilderBar';

const TAB = {
    FILTERS: 0,
    TEAM_BUILDER: 1,
}

export default function SideBar() {
    const [hide, setHide] = React.useState(false);
    const [tab, setTab] = React.useState(TAB.FILTERS);

    const toggleBar = (newTab) => {
        setTab(newTab);
        if (tab === newTab || hide)
            setHide(!hide);
    }

    return (
        <>
            <div className={hide ? "controls hidden" : "controls"}>
                <div style={{ width: "100%", minWidth: 245 }}>
                    {
                        tab === TAB.FILTERS ?
                            <Filters /> :
                            <TeamBuilderBar />
                    }
                </div>
            </div>
            <div className="controls-toggle">
                <div className='controls-toggle-inner noselect vertical-text'>
                    <span className={tab === TAB.FILTERS ? 'active' : ''} 
                        onClick={() => toggleBar(TAB.FILTERS)}>Filters</span>
                    <span className={tab === TAB.TEAM_BUILDER ? 'active' : ''} 
                        onClick={() => toggleBar(TAB.TEAM_BUILDER)}>Team Builder</span>
                </div>
            </div>
        </>
    );
}
