import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { motion, useScroll, useTransform } from "framer-motion"
import ReactConfetti from "react-confetti";

const StatsDisplay = (props: {
  value: number;
  description: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: [30, -30, 30, -30] }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography sx={{ fontSize: 40 }}>{props.value}</Typography>
        <Typography sx={{ fontSize: 13 }}>{props.description}</Typography>
      </Box>
    </motion.div>
  )
}

const Dashboard: NextPage = () => {

  const username = "Sean"
  const community = "UTS"
  const avatar = 'https://mui.com/static/images/avatar/3.jpg'
  const validYears = [2020, 2021, 2022]

  const [year, setYear] = useState(validYears.at(-1)?.toString());
  const [height, setHeight] = useState(0)
  const [width, setHWidth] = useState(0)

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1.1]);

  useEffect(() => {
    if (!height) setHeight(window.innerHeight)
    if (!width) setHWidth(window.innerWidth)
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  return (
    <Template title="Dashboard">
      <ReactConfetti width={width} height={height} />
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <Avatar src={avatar} sx={{ height: 300, width: 300 }} />
        </motion.div>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <motion.div
          transition={{ y: { duration: 0.4, yoyo: Infinity, ease: "easeOut" } }}
          animate={{ backgroundColor: 'white', y: ["30%", "-30%"] }}
        >
          <ArrowDownwardIcon sx={{ height: 80, width: 80 }} />
        </motion.div>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography sx={{ fontSize: 35 }}>{community}'s environmental impact in </Typography>
        <FormControl sx={{ ml: 3 }}>
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

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <motion.div
          style={{ scale }}
        >
          <motion.div
            style={{
              scaleY: scrollYProgress
            }}
          />
          {/* Replace with map view later*/}
          <Box sx={{ border: 1, width: 600, height: 400 }} />
        </motion.div>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 9 }}>
        <Box sx={{ display: 'flex', width: 700, justifyContent: 'space-between' }}>
          <StatsDisplay value={42} description='trades made in total' />
          <StatsDisplay value={58} description='cubic metres landfill reduced' />
          <StatsDisplay value={68} description='units estimated CO2 reduction' />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 9, mb: 9 }}>
        <Button variant="outlined" sx={{ p: 1.5, borderRadius: 30 }} href='/environment/methodology'>
          How do we estimate these stats?
        </Button>
      </Box>
    </Template >
  );
};

export default Dashboard
