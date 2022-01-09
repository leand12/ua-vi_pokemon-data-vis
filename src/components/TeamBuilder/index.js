import StatsTable from 'components/StatsTable';
import React from 'react'
import data from "archive/pokemon.json"
import useCompareStore from 'stores/useCompareStore';
import SmInfoCard from 'components/SmInfoCard';
import { type_images } from 'utils/globals';

export default function TeamBuilder() {
    
    const team = useCompareStore(state => state.team);

    const [loading, setLoading] = React.useState(true)
    const [stats, setStats] = React.useState({});
    const [coverage, setCoverage] = React.useState({});
    const [highlighted, setHighlighted] = React.useState(Array(6).fill(false));

    React.useEffect(() => {
        

        let stats_ = {}; 
        let coverage_ = {};

        // Average Stats_
        let attributes = ["attack", "defense", "sp_attack", "sp_defense", "speed", "hp"];
        let avgs = [0,0,0,0,0,0];

        let team_types = new Set();

        for(let pk of team) {
            for(let i=0; i < attributes.length; i++) {
                avgs[i] += pk[attributes[i]];
            }
            team_types.add(pk.type1)
            if(pk.type2)
                team_types.add(pk.type2)
        }

        for(let i=0; i < avgs.length; i++) {
            if(team.length) {
                stats_[attributes[i]] = Math.round(avgs[i] / team.length);
            } else {
                stats_[attributes[i]] = avgs[i];
            }
        }

        // Coverage
        for(let _against of Object.keys(data.types)) {
            let temp = [];
            for(let type of team_types) 
                if(data.types[_against][type] == 2)
                    temp.push(type)  
            coverage_[_against.replace("_against", "")] = temp;
        }
        

        setCoverage(coverage_)
        setStats(stats_)
        setLoading(false)
    }, [team])
    
    const typeOver = (types) => {

        let temp = [...highlighted]
        for(let i=0; i < team.length; i++) {
            if(types.includes(team[i].type1)  || types.includes(team[i].type2))
                temp[i] = true
        }
        setHighlighted(temp)
    }

    const clearOvers = () => {
        setHighlighted(Array(6).fill(false))
    }

    return (
        team.length == 0 || loading ? <></> :
        <div>
            {team.map((p, i) => {
                return (
                    <SmInfoCard key={p.name + "_" + i} pokemon={p} onTeam={true} highlighted={highlighted[i]}/> 
                )
            })}
            <StatsTable data={stats} />    

            {Object.keys(coverage).map((t, i) => {
                return (
                    <img onMouseOver={() => typeOver(coverage[t])} onMouseLeave={() => clearOvers()} key={t + "_" + i} src={type_images[t]} style={{border: "1px solid", borderColor: coverage[t].length ? "gold" : "transparent", opacity: coverage[t].length ? 1 : 0.3 }}></img>
                )
            })}        
        </div>
    )
}
