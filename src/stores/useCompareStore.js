import create from "zustand";
import { combine } from "zustand/middleware";
import data from 'archive/pokemon.json'

const useCompareStore = create(
    combine(
        {
            compare1 : {},
            compare2 : {},
            selected : {},
            team     : [data.pokemons[1]]
        },
        (set, get) => ({
            setSelected: (newSelected) => {
                return set(() => {
                    return { selected: newSelected };
                })
            },
            setCompare1: (newCompare1) => {
                return set(() => {
                    return { compare1: newCompare1 };
                })
            },
            setCompare2: (newCompare2) => {
                return set(() => {
                    return { compare2: newCompare2 };
                })
            },
            setTeam: (pokemon) => {
                return set(() => {
                    const team = [...get().team];
                    if(team.length < 6) 
                        team.push(pokemon);
                    return {team}
                })
            },
            removeTeam: (pokemon) => {
                
                return set(() => {
                    const team = [...get().team];
                    for(let i=0; i < team.length; i++) {
                        if(team[i].pokedex_number == pokemon) {
                            team.splice(i,1);
                            break;
                        }
                    }
                    return {team}
                })
            }
        })
    )
);

export default useCompareStore;
