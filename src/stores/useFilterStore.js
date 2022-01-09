import create from "zustand";
import { combine } from "zustand/middleware";
import data from "archive/pokemon.json";

const filterPokemons = (filters) => {
    const pokemons = [],
        pokemonsTR = [];  // pokemons used in TypeRelation filtered regardless its type

    for (const p of data.pokemons) {
        let add = true, addTR = true;
        let { type1, type2, generation } = p;
        type2 = type2 ? type2 : type1;

        if (filters.typesSelection === 'any') {
            if (![type1, type2].some(t => filters.types.includes(t)))
                add = false;
        } else if (filters.typesSelection === 'all') {
            if (![type1, type2].every(t => filters.types.includes(t)))
                add = false;
        }

        if (!filters.generations.includes(generation)) {
            add = addTR = false;
        }

        if (add) pokemons.push(p);
        if (addTR) pokemonsTR.push(p);
    }

    return { pokemons, pokemonsTR };
}

const initFilters = {
    types: ['fire', 'water'],
    typesSelection: 'all',
    generations: [1, 2, 3, 4, 5, 6, 7],
}

const useFilterStore = create(
    combine(
        {
            filters: initFilters,
            ...filterPokemons(initFilters),
        },
        (set, get) => ({
            setFilters: (newfilters) => {
                return set(() => {
                    const filters = { ...get().filters, ...newfilters };
                    const { pokemons, pokemonsTR } = filterPokemons(filters);
                    if ('types' in newfilters || 'typesSelection' in newfilters) {
                        return { filters, pokemons };
                    }
                    return { filters, pokemons, pokemonsTR };
                })
            }
        })
    )
);

export default useFilterStore;
