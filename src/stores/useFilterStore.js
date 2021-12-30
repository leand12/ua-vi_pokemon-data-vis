import create from "zustand";
import { combine } from "zustand/middleware";

const filterPokemons = (pokemons, filters) => {

    return pokemons.filter(p => {
        let add = true;

        if (filters.typesSelection === 'any') {
            if (![p.type1, p.type2].some(t => filters.types.includes(t)))
                add = false;            
        } else if (filters.typesSelection === 'all') {
            if (![p.type1, p.type2].every(t => filters.types.includes(t)))
                add = false;
        }

        if (!filters.generations.includes(p.generation))
            add = false;

        return add;
    });
}

const useFilterStore = create(
    combine(
        {
            filters: {
                types: [],
                typesSelection: 'any',
                generations: [1],
            },
            pokemons: [],
        },
        (set, get) => ({
            setFilters: (filters) => {
                return set(() => {
                    filters = {...get().filters, ...filters};
                    const pokemons = filterPokemons(get().pokemons, filters);
                    return { filters, pokemons }
                })
            },
            setPokemons: (pokemons) => {
                return set(() => {
                    pokemons = filterPokemons(pokemons, get().filters);
                    return { pokemons };
                });
            },

            // wirePlayers: (ids: string[], merge: boolean) => {
            //     return set((s) => {
            //         if (merge) {
            //             const groupPlayers = {...s.groupPlayers};
            //             for (const id of ids)
            //                 groupPlayers[id] = { requested: false};
            //             return { groupPlayers };
            //         }
            //         const groupPlayers = {} as Record<string, Player2>;
            //         for (const id of ids)
            //             groupPlayers[id] = { requested: false};
            //         return { ...s, groupPlayers };
            //     }, !merge);
            // },
            // movePlayer: (id: string, position: Vector, velocity: Vector) => {
            //     return set((s) => {
            //         const players = {...s.players};
            //         players[id] = { position: position, velocity: velocity };
            //         return { players };
            //     });
            // },
            // setGroups: (grps: Record<string, string[]>) => {
            //     return set((s) => {
            //         return { ...s, groups: grps };
            //     }, true);
            // },

        })
    )
);

export default useFilterStore;
