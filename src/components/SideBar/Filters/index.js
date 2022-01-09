import TypeSelect from './TypeSelect';
import TypeSwitch from './TypeSwitch';
import GenSelect from './GenSelect';
import FormControl from '@mui/material/FormControl';

export default function SideBar() {
    return (
        <>
            <FormControl>
                <h1>Filters</h1>
                <TypeSelect />
                <TypeSwitch />
                <GenSelect />
                
            </FormControl>
        </>
    );
}