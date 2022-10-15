import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CategorySearch } from "./CategorySearch";

export interface SearchBarProps {
  categories: string[];
  distance: number;
  listing: 'have' | 'want';
  price: {
    min: number;
    max: number;
  }
}

const DistanceDropdown = (props: {
  distance: number;
  setDistance: (arg: number) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.distance}
        label="Distance"
        onChange={e => props.setDistance(
          typeof e.target.value === 'number'
            ? e.target.value
            : parseInt(e.target.value)
        )}
      >
        <MenuItem value={10}>Within 10 km</MenuItem>
        <MenuItem value={25}>Within 20 km</MenuItem>
        <MenuItem value={50}>Within 50 km</MenuItem>
        <MenuItem value={100}>Within 100 km</MenuItem>
        <MenuItem value={100000}>No Limit</MenuItem>
      </Select>
    </FormControl>
  )
}

export const SearchBar = (props: {
  data: SearchBarProps
  setData: (arg: SearchBarProps) => void;
  onSearch: () => void;
}) => {
  const setCategories = (categories: string[]) => {
    props.setData({ ...props.data, categories })
  }
  const setDistance = (distance: number) => {
    props.setData({ ...props.data, distance })
  }
  return (
    <>
      <CategorySearch categories={props.data.categories} setCategories={setCategories} onSearch={props.onSearch} />
      <DistanceDropdown distance={props.data.distance} setDistance={setDistance} />
    </>
  )
}