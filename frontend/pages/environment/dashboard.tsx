import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";

const Dashboard: NextPage = () => {

  const username = "Sean"
  const [year, setYear] = useState('2022');

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  return (
    <Template title="Dashboard">
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography sx={{ fontSize: 35 }}>Congrats {username}, your impact made in</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          onChange={handleChange}
          sx={{ ml: 3, mr: 3 }}
        >
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
        </Select>
        <Typography sx={{ fontSize: 35 }}>is</Typography>
      </Box>
    </Template>
  );
};

export default Dashboard
