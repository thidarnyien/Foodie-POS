

import { OutlinedInput } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MenuCategories, Menus } from '@prisma/client';
import * as React from 'react';

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
interface Props{
    title : string;
    selected : number[];
    setSelected : (value: React.SetStateAction<number[]>) => void;
    items: MenuCategories[] | Menus[];
}

export default function MultiSelect({title, selected,setSelected,items}: Props) {
  
  return (
    <div>
      <FormControl sx={{my: 2, width: 350 }}>
      <InputLabel>{title}</InputLabel>
        <Select
          multiple
          value={selected}
          onChange={(evt)=> {
            const selected = evt.target.value as number[];
            setSelected(selected);
          }}
          input={<OutlinedInput label={title} />}
          renderValue={()=> {
            return selected.map((itemId)=> items.find((item)=> item.id === itemId)).map((item)=> item?.name).join(", ");
          }}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={selected.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}