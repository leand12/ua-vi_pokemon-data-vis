import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import SmInfoCard from 'components/SmInfoCard';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style.css';

import useFilterStore from 'stores/useFilterStore';

export default function Filters() {
    const [search, setSearch] = useState('d');
    const [pokemons, setPokemons] = useState([]);
    const [shownPokemons, setShownPokemons] = useState([]);
    const allPokemons = useFilterStore(state => state.pokemons);

    useEffect(() => {
        let filteredPokemons = allPokemons
            .filter(pk => pk.name.toLowerCase().includes(search.toLowerCase()))

        setPokemons(filteredPokemons);
        setShownPokemons(filteredPokemons.slice(0, 20));

    }, [allPokemons, search])

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleLoadMore = () => {
        setShownPokemons(pokemons.slice(0, shownPokemons.length + 20));
    }

    return (
        <div style={{ textAlign: "center" }}>
            <FormControl sx={{ width: "100%" }}>
                <TextField sx={{ width: "100%" }} id="search-pokemon" label="Name" variant="outlined" value={search} onChange={handleChange} />
            </FormControl>
            <div style={{ marginTop: 16, paddingLeft: 8, textAlign: "left" }}>
                Showing <strong>{shownPokemons.length}</strong> of {pokemons.length} results:
            </div>
            <div style={{ marginTop: 16 }}>
                {
                    shownPokemons.map((pk, i) => <SmInfoCard key={i} pokemon={pk} />)
                }
                {console.log(pokemons.length, shownPokemons.length)}
                {
                    shownPokemons.length < pokemons.length ?
                        <Button className="btn-load" variant="text" onClick={handleLoadMore}>Load More</Button> : null
                }

            </div>
        </div>
    );
}