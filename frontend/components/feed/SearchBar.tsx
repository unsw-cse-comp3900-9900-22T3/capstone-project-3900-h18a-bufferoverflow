import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { MAX_DISTANCE, MAX_PRICE } from "../../utils/globals";
import { Toast } from "../generic/Toast";
import { CategorySearch } from "./CategorySearch";
import { useQuery, gql } from "@apollo/client";

/////////////////////////////////////////////////////////////////////////////
// Constants and Types
/////////////////////////////////////////////////////////////////////////////

type ListingType = "have" | "want";

type PriceType = {
  min: number;
  max: number;
};

export interface SearchBarProps {
  categories: string[];
  distance: number;
  listing: ListingType;
  price: PriceType;
}

interface CategoriesGraphqlProps {
  getCategories: {
    success: boolean | null;
    erorrs: string[] | null;
    categories: string[] | undefined;
  };
}

const GET_CATEGORIES = gql`
  query {
    getCategories {
      categories
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const DistanceDropdown = (props: {
  distance: number;
  setDistance: (arg: number) => void;
  loggedIn: boolean;
  hasAddress: boolean
}) => {
  const contents = (
    <FormControl fullWidth sx={{ width: 200, ml: 2 }}>
      <InputLabel id="demo-simple-select-label">Distance</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.distance}
        label="Distance"
        onChange={(e) => props.setDistance(e.target.value as number)}
        disabled={!(props.loggedIn && props.hasAddress)}
      >
        <MenuItem value={10}>Within 10 km</MenuItem>
        <MenuItem value={25}>Within 25 km</MenuItem>
        <MenuItem value={50}>Within 50 km</MenuItem>
        <MenuItem value={100}>Within 100 km</MenuItem>
        <MenuItem value={MAX_DISTANCE}>No Limit</MenuItem>
      </Select>
    </FormControl>
  );
  if (!props.loggedIn) {
    return <Tooltip title="Must be logged in to search by distance">{contents}</Tooltip>;
  } else if (!props.hasAddress) {
    return <Tooltip title="Must set an address to search by distance">{contents}</Tooltip>;
  } else {
    return contents
  }
};

const ListingDropdown = (props: {
  listing: ListingType;
  setListing: (arg: ListingType) => void;
}) => {
  return (
    <FormControl fullWidth sx={{ width: 200, ml: 2 }}>
      <InputLabel id="demo-simple-select-label">Listing Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.listing}
        label="Listing Type"
        onChange={(e) => props.setListing(e.target.value as ListingType)}
      >
        <MenuItem value={"want"}>Want</MenuItem>
        <MenuItem value={"have"}>Have</MenuItem>
      </Select>
    </FormControl>
  );
};

const PriceDropdown = (props: {
  price: PriceType;
  setPrice: (arg: PriceType) => void;
}) => {
  const [errorToast, setErrorToast] = useState<string>("");
  const [min, setMin] = useState<number>(props.price.min);
  const [max, setMax] = useState<number>(props.price.max);

  return (
    <FormControl fullWidth sx={{ width: 200, ml: 2, mr: 2 }}>
      <Toast toast={errorToast} setToast={setErrorToast} type="warning" />
      <InputLabel id="demo-simple-select-label">Price</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Listing Type"
        value="price"
      >
        <MenuItem value={"price"}>
          ${props.price.min} - {props.price.max}
        </MenuItem>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: 180 }}>
            <TextField
              id="outlined-basic"
              label="Min"
              variant="outlined"
              type="number"
              value={min}
              sx={{ m: 0.5 }}
              onChange={(e) => setMin(parseInt(e.target.value))}
            />
            <TextField
              id="outlined-basic"
              label="Max"
              variant="outlined"
              type="number"
              value={max}
              sx={{ m: 0.5 }}
              onChange={(e) => setMax(parseInt(e.target.value))}
            />
            <Button
              variant="outlined"
              sx={{ borderRadius: 30, m: 0.5 }}
              onClick={() => {
                if (min > max)
                  setErrorToast("Min price cannot be greater than max price");
                else if (max > MAX_PRICE)
                  setErrorToast(
                    "Max price cannot be greater than " + MAX_PRICE
                  );
                else if (isNaN(min) || isNaN(max))
                  setErrorToast("Min and max prices must be non-empty");
                else props.setPrice({ min, max });
              }}
            >
              Select
            </Button>
          </Box>
        </Box>
      </Select>
    </FormControl>
  );
};

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

export const SearchBar = (props: {
  data: SearchBarProps;
  setData: (arg: SearchBarProps) => void;
  onSearch: () => void;
  loggedIn: boolean;
  hasAddress: boolean;
}) => {
  const validSearchCategories =
    useQuery<CategoriesGraphqlProps>(GET_CATEGORIES).data?.getCategories
      .categories;

  const setCategories = (categories: string[]) => {
    props.setData({ ...props.data, categories });
  };
  const setDistance = (distance: number) => {
    props.setData({ ...props.data, distance });
  };
  const setListing = (listing: ListingType) => {
    props.setData({ ...props.data, listing });
  };
  const setPrice = (price: PriceType) => {
    props.setData({ ...props.data, price });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 5,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "90vw" }}
      >
        <CategorySearch
          title="Categories"
          setCategories={setCategories}
          onSearch={props.onSearch}
          validCategories={validSearchCategories}
          width={"60vw"}
        />
        <DistanceDropdown
          distance={props.data.distance}
          setDistance={setDistance}
          loggedIn={props.loggedIn}
          hasAddress={props.hasAddress}
        />
        <ListingDropdown listing={props.data.listing} setListing={setListing} />
        <PriceDropdown price={props.data.price} setPrice={setPrice} />
      </Box>
      <Divider sx={{ width: "95vw", mt: 5 }} />
    </Box>
  );
};
