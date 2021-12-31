import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import CancelIcon from '@mui/icons-material/Cancel';

import useFilterStore from 'stores/useFilterStore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const generations = [1, 2, 3, 4, 5, 6, 7];


function getStyles(name, names, theme) {
    return {
        fontWeight:
            names.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function GenSelect() {
    const theme = useTheme();
    const filters = useFilterStore(state => state.filters);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        // On autofill we get a the stringified value.
        let generations = typeof value === 'string' ? value.split(',') : value;
        generations = generations.map(t => parseInt(t));

        useFilterStore.getState().setFilters({ generations });
    };

    const handleChipDelete = (value) => {
        const generations = useFilterStore.getState().filters.generations
            .filter(g => g != value);
        useFilterStore.getState().setFilters({ generations });
    };

    const handleChipMouseDown = (event) => {
        event.stopPropagation();
    };

    return (
        <FormControl style={{ position: 'relative', margin: '1.5em 0' }}>
            <InputLabel id="gen-select-label">Generations</InputLabel>
            <Select
                labelId="gen-select-label"
                id="gen-select"
                multiple
                value={filters.generations}
                onChange={handleChange}
                input={<OutlinedInput id="gen-select-input" label="Generations" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} onDelete={() => handleChipDelete(value)} deleteIcon={
                                <CancelIcon name={value} onMouseDown={handleChipMouseDown} />
                            } />
                        ))}
                    </Box>
                )}
                sx={{ width: "100%" }}
                MenuProps={MenuProps}
            >
                {generations.map((gen) => (
                    <MenuItem
                        key={gen}
                        value={gen}
                        style={getStyles(gen, filters.generations, theme)}
                    >
                        {gen}
                    </MenuItem>
                ))}
            </Select>

        </FormControl>
    );
}
