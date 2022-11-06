import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";

const StatsDisplay = (props: {
  value: number;
  description: string;
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography sx={{ fontSize: 40 }}>{props.value}</Typography>
      <Typography sx={{ fontSize: 13 }}>{props.description}</Typography>
    </Box>
  )
}

const Dashboard: NextPage = () => {

  const username = "Sean"
  const avatar = 'https://mui.com/static/images/avatar/3.jpg'

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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Avatar src={avatar} sx={{ height: 300, width: 300 }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 9 }}>
        <Box sx={{ display: 'flex', width: 700, justifyContent: 'space-between' }}>
          <StatsDisplay value={8} description='trades made in total' />
          <StatsDisplay value={0.3} description='cubic metres landfill reduced' />
          <StatsDisplay value={3.14} description='units estimated CO2 reduction' />
        </Box>
      </Box>
    </Template >
  );
};

export default Dashboard
