import { Box, Button, InputAdornment, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react"
import { Toast } from "../generic/Toast";

export const CategorySearch = () => {

  const [categories, setCategories] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const [errorToast, setErrorToast] = useState<string>('');

  return (
    <>
      <Toast toast={errorToast} setToast={setErrorToast} type='warning' />
      <TextField
        id="standard-basic"
        label="Search"
        variant="outlined"
        sx={{ width: 800 }}
        value={input}
        onChange={e => setInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
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
        onKeyUp={e => {
          console.log(e.key)
          if (e.key == 'Enter') {
            if (categories.length > 4) setErrorToast('Cannot specify more than 5 categories')
            else if (input && !categories.includes(input.toUpperCase())) {
              setCategories([...categories, input.toUpperCase()])
            }
            setInput('')
          } else if (e.key == 'Backspace') {
            categories.pop()
            setCategories([...categories])
          }
        }}
      />
    </>
  )
}