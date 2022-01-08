import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import useFilterStore from 'stores/useFilterStore';

const CustomSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        backgroundColor: '#f00',
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#fff',
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default function TypeSwitch() {
    const filters = useFilterStore(state => state.filters);

    const handleChange = (event) => {
        useFilterStore.getState().setFilters({
            typesSelection: event.target.checked ? 'any' : 'all'
        });
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Typography variant="button" display="block" style={{color: "rgba(0, 0, 0, 0.6)"}}>ALL</Typography>
            <CustomSwitch checked={filters.typesSelection === 'any'} onChange={handleChange} inputProps={{ 'aria-label': 'ant design' }} />
            <Typography variant="button" display="block" style={{color: "rgba(0, 0, 0, 0.6)"}}>ANY</Typography>
        </Stack>
    )
}



