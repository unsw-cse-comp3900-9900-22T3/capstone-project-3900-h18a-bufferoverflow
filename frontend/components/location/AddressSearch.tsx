import TextField from "@mui/material/TextField/TextField";
import { List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { debouncedMethod } from "../../utils/utils";
import { useState } from "react";
import SyncIcon from "@mui/icons-material/Sync";

interface NominatimResult {
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  type: string;
}

export const AddressSearch = (props: {
  address: String;
  placeholder: String;
  setAddress: (address: string) => void;
  setCommunity?: (community: string) => void;
  setPosition?: (position: Array<number>) => void;
  marginBottom?: number;
  multiline?: boolean;
  rows?: number;
}) => {
  const [results, setResults] = useState<Array<NominatimResult>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function geoCode(address = "") {
    address = address.trim();
    if (address.length === 0) {
      setResults([]);
      return;
    }

    if (results.length === 0) {
      setLoading(true);
    }

    // only get addresses inside Australia, limited to 5
    const nominatim = `https://nominatim.openstreetmap.org/search?format=json&q=${address}&countrycodes=au&limit=5`;

    // can maybe add something with controller.abort() to stop waiting for existing fetches
    fetch(nominatim)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setResults(data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  var debouncer = new debouncedMethod((address: string) => {
    geoCode(address);
  }, 1000);

  // possible refactor - use autocomplete instead here
  return (
    <Stack sx={{ mb: props.marginBottom }}>
      <TextField
        placeholder={props.placeholder}
        label={props.placeholder}
        multiline={props.multiline}
        //   might have to make the next few lines to be passed in from context
        rows={props.rows != undefined ? props.rows : 1}
        value={props.address}
        onChange={(e) => {
          props.setAddress(e.target.value);
          debouncer.invoke(e.target.value);
        }}
      />
      {loading ? (
        <SyncIcon />
      ) : (
        <List>
          {results.map((result) => (
            <ListItemButton
              onClick={() => {
                props.setAddress(result.display_name);

                // kinda jank - but allows someone to either search for a
                // suburb name or an actual address
                if (result.type === "administrative") {
                  props.setCommunity?.(result.display_name.split(",")[0]);
                } else {
                  props.setCommunity?.(result.display_name.split(",")[2]);
                }

                props.setPosition?.([result.lat, result.lon].map(parseFloat));
                setResults([]);
              }}
            >
              {/* display_name isn't the nicest format, you'd have to send an 
            additional request to /details for something more custom
            and do more logic */}
              <ListItemText>{result.display_name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      )}
    </Stack>
  );
};
