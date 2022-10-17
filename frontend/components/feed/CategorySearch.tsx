import { Button, InputAdornment, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react"
import { Toast } from "../generic/Toast";
import SearchIcon from '@mui/icons-material/Search';

export const CategorySearch = (props: {
  categories: string[];
  setCategories: (arg: string[]) => void;
  onSearch: () => void;
  width?: number | string;
  validCategories?: string[];
}) => {

  const { categories, setCategories } = props
  const [input, setInput] = useState<string>('')
  const [errorToast, setErrorToast] = useState<string>('');
  const validCategories = props.validCategories ? props.validCategories.map(str => str.toUpperCase()) : []

  return (
    <>
      <Toast toast={errorToast} setToast={setErrorToast} type='warning' />
      <TextField
        id="standard-basic"
        label="Search"
        variant="outlined"
        sx={{ width: props.width ? props.width : 800 }}
        value={input}
        onChange={e => setInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button sx={{ minWidth: 40, borderRadius: 30, mr: 1 }} onClick={props.onSearch}>
                <SearchIcon />
              </Button>
              {
                categories.map((category, index) => (
                  <Button
                    key={category}
                    sx={{ border: 1, borderRadius: 30, p: 0.2, pl: 1.2, pr: 1.2, m: 0.5 }}
                    endIcon={<CloseIcon />}
                    onClick={() => {
                      categories.splice(index, 1)
                      setCategories([...categories])
                    }}
                  >
                    {category}
                  </Button>
                ))
              }
            </InputAdornment>
          ),
        }}
        onKeyDown={e => {
          if (e.key == 'Enter') {
            const newCategory = input.toUpperCase()
            if (categories.length > 4) setErrorToast('Cannot specify more than 5 categories')
            else if (!validCategories.includes(newCategory)) setErrorToast('Valid categories are: ' + validCategories.join(', '))
            else if (categories.includes(newCategory)) setErrorToast('Category already present')
            else setCategories([...categories, newCategory])
            setInput('')
          } else if (e.key == 'Backspace' && !input) {
            categories.pop()
            setCategories([...categories])
          }
        }}
      />
    </>
  )
}