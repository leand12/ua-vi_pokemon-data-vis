import TypeSelect from './TypeSelect';
import TypeSwitch from './TypeSwitch';
import GenSelect from './GenSelect';
import FormControl from '@mui/material/FormControl';

export default function Filters() {
    return (
        <>
            <FormControl sx={{ width: "100%" }}>
                <h1>Filters</h1>
                <TypeSelect />
                <TypeSwitch />
                <GenSelect />
                
            </FormControl>
        </>
    );
}