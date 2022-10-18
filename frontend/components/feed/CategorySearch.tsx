import { Autocomplete, Box, Button, InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export const CategorySearch = (props: {
  title: string;
  setCategories: (arg: string[]) => void;
  onSearch?: () => void;
  width?: number | string;
  validCategories?: string[];
}) => {

  const validCategories = props.validCategories ? props.validCategories : []
  const width = props.width ? props.width : 500

  return (
    <Autocomplete
      multiple
      sx={{ width }}
      id="tags-outlined"
      options={validCategories}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      onChange={(_, newCategories) => props.setCategories([...newCategories])}
      renderInput={(params) => (
        <Box sx={{ display: 'flex' }}>
          {
            props.onSearch
              ? <Button sx={{ minWidth: 40, pr: 3, pl: 3 }} onClick={props.onSearch}>
                <SearchIcon />
              </Button>
              : <></>
          }
          <TextField
            {...params}
            label={props.title}
            placeholder={props.title}
          />
        </Box>
      )}
    />
  )
}