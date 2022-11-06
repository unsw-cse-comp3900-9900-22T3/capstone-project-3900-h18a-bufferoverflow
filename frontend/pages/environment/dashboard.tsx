import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
  const community = "UTS"
  const avatar = 'https://mui.com/static/images/avatar/3.jpg'
  const validYears = [2020, 2021, 2022]

  const [year, setYear] = useState(validYears.at(-1)?.toString());

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  return (
    <Template title="Dashboard">
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography sx={{ fontSize: 35 }}>Congrats {username}, your impact made in</Typography>
        <FormControl sx={{ ml: 3, mr: 3 }}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Year"
            onChange={handleChange}
          >
            {validYears.slice(0).reverse().map(year => (<MenuItem value={year}>{year}</MenuItem>))}
          </Select>
        </FormControl>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 35 }}>Thanks for doing your bit for the</Typography>
        <Typography sx={{ fontSize: 35 }}>{community} community!</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 9 }}>
        <ArrowDownwardIcon sx={{ height: 80, width: 80 }} />
      </Box>
    </Template >
  );
};

export default Dashboard
