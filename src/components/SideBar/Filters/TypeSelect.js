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

import { colours } from 'utils/typeRelation';

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

const types = Object.keys(colours);

function getStyles(name, names, theme) {
    return {
        fontWeight:
            names.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function TypeSelect() {
    const theme = useTheme();
    const filters = useFilterStore(state => state.filters);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        // On autofill we get a the stringified value.
        const types = typeof value === 'string' ? value.split(',') : value;

        useFilterStore.getState().setFilters({ types })
    };

    const handleChipDelete = (value) => {
        const types = useFilterStore.getState().filters.types
            .filter(t => t != value);
        useFilterStore.getState().setFilters({ types });
    };

    const handleChipMouseDown = (event) => {
        event.stopPropagation();
    };

    return (
        <FormControl style={{ position: 'relative', margin: '1.5em 0' }}>
            <InputLabel id="type-select-label">Types</InputLabel>
            <Select
                labelId="type-select-label"
                id="type-select"
                multiple
                value={filters.types}
                onChange={handleChange}
                input={<OutlinedInput id="type-select-input" label="Types" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} sx={{ backgroundColor: colours[value] }}
                                onDelete={() => handleChipDelete(value)} deleteIcon={
                                    <CancelIcon name={value} onMouseDown={handleChipMouseDown} />
                                } />
                        ))}
                    </Box>
                )}
                sx={{ width: "100%" }}
                MenuProps={MenuProps}
            >
                {types.map((type) => (
                    <MenuItem
                        key={type}
                        value={type}
                        style={getStyles(type, filters.types, theme)}
                    >
                        {type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
