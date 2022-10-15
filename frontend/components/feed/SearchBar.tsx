import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CategorySearch } from "./CategorySearch";

/////////////////////////////////////////////////////////////////////////////
// Types
/////////////////////////////////////////////////////////////////////////////

type ListingType = 'have' | 'want'

export interface SearchBarProps {
  categories: string[];
  distance: number;
  listing: ListingType;
  price: {
    min: number;
    max: number;
  }
}

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const DistanceDropdown = (props: {
  distance: number;
  setDistance: (arg: number) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Distance</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.distance}
        label="Distance"
        onChange={e => props.setDistance(e.target.value as number)}
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

const ListingDropdown = (props: {
  listing: ListingType;
  setListing: (arg: ListingType) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Listing Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.listing}
        label="Listing Type"
        onChange={e => props.setListing(e.target.value as ListingType)}
      >
        <MenuItem value={'want'}>Want</MenuItem>
        <MenuItem value={'have'}>Have</MenuItem>
      </Select>
    </FormControl>
  )
}

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

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
  const setListing = (listing: ListingType) => {
    props.setData({ ...props.data, listing })
  }
  return (
    <>
      <CategorySearch categories={props.data.categories} setCategories={setCategories} onSearch={props.onSearch} />
      <DistanceDropdown distance={props.data.distance} setDistance={setDistance} />
      <ListingDropdown listing={props.data.listing} setListing={setListing} />
    </>
  )
}