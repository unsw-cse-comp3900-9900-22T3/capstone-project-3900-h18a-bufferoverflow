import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { MAX_DISTANCE } from "../../utils/globals";
import { CategorySearch } from "./CategorySearch";

/////////////////////////////////////////////////////////////////////////////
// Constants and Types
/////////////////////////////////////////////////////////////////////////////

type ListingType = 'have' | 'want'

type PriceType = {
  min: number;
  max: number;
}

export interface SearchBarProps {
  categories: string[];
  distance: number;
  listing: ListingType;
  price: PriceType;
}

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const DistanceDropdown = (props: {
  distance: number;
  setDistance: (arg: number) => void;
}) => {
  return (
    <FormControl fullWidth sx={{ width: 200 }}>
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
        <MenuItem value={MAX_DISTANCE}>No Limit</MenuItem>
      </Select>
    </FormControl>
  )
}

const ListingDropdown = (props: {
  listing: ListingType;
  setListing: (arg: ListingType) => void;
}) => {
  return (
    <FormControl fullWidth sx={{ width: 200 }}>
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

const PriceDropdown = (props: {
  price: PriceType;
  setPrice: (arg: PriceType) => void;
}) => {
  return (
    <FormControl fullWidth sx={{ width: 200 }}>
      <InputLabel id="demo-simple-select-label">Price</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Listing Type"
        value="price"
      >
        <MenuItem value={'price'}>{props.price.min} - {props.price.max}</MenuItem>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: 180 }}>
            <TextField id="outlined-basic" label="Min" variant="outlined" sx={{ mb: 1 }} />
            <TextField id="outlined-basic" label="Max" variant="outlined" sx={{ mb: 1 }} />
            <Button variant="outlined" sx={{ borderRadius: 30 }}>Select</Button>
          </Box>
        </Box>
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
  const setPrice = (price: PriceType) => {
    props.setData({ ...props.data, price })
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1900 }}>
        <CategorySearch categories={props.data.categories} setCategories={setCategories} onSearch={props.onSearch} width={1200} />
        <DistanceDropdown distance={props.data.distance} setDistance={setDistance} />
        <ListingDropdown listing={props.data.listing} setListing={setListing} />
        <PriceDropdown price={props.data.price} setPrice={setPrice} />
      </Box>
      <Divider sx={{ width: 2000, mt: 5 }} />
    </Box>
  )
}