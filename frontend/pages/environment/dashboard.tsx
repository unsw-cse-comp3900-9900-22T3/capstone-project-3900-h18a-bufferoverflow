import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { motion, useScroll, useTransform } from "framer-motion"
import ReactConfetti from "react-confetti";
import { gql, useQuery } from "@apollo/client";
import { useStore } from "../../store/store";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const GET_USER_STATS = gql`
  query ($email: String!, $year: Int!) {
    getUserStats(userEmail: $email, year: $year) {
      errors
      success
      userStats {
        numTrades
        carbonDioxideSaving
        cubicMeterSaving
      }
    }
  }
`;

const GET_COMMUNITY_STATS = gql`
  query ($email: String!, $year: Int!) {
    getCommunityStats(userEmail: $email, year: $year) {
      errors
      success
      communityStats {
        name
        numTrades
        carbonDioxideSaving
        cubicMeterSaving
      }
    }
  }
`;

const GET_USER = gql`
  query ($email: String!) {
    getUser(email: $email) {
      errors
      success
      user {
        displayImg
        username
      }
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const Dashboard: NextPage = () => {

  const validYears = [2020, 2021, 2022]

  const [year, setYear] = useState(validYears.at(-1)?.toString());
  const [communityYear, setCommunityYear] = useState(validYears.at(-1)?.toString());
  const [height, setHeight] = useState(0)
  const [width, setHWidth] = useState(0)

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1.1]);

  const { auth } = useStore()
  const user = useQuery(GET_USER, { variables: { email: auth?.email } }).data?.getUser?.user;
  const userStats = useQuery(GET_USER_STATS, { variables: { email: auth?.email, year: parseInt(year || '2022') } }).data?.getUserStats?.userStats;
  const communityStats = useQuery(GET_COMMUNITY_STATS, { variables: { email: auth?.email, year: parseInt(communityYear || '2022') } }).data?.getCommunityStats?.communityStats;

  useEffect(() => {
    if (!height) setHeight(window.innerHeight)
    if (!width) setHWidth(window.innerWidth)
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  
  const handleCommunityChange = (event: SelectChangeEvent) => {
    setCommunityYear(event.target.value as string);
  };

  return (
    <Template title="Dashboard">
      <ReactConfetti width={width} height={height * 2} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Typography sx={{ fontSize: 35 }}>
          Congrats {user?.username}, your impact made in
        </Typography>
        <FormControl sx={{ ml: 3, mr: 3 }}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Year"
            onChange={handleChange}
          >
            {validYears
              .slice(0)
              .reverse()
              .map((year) => (
                <MenuItem value={year}>{year}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <Typography sx={{ fontSize: 35 }}>is</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Avatar src={user?.displayImg} sx={{ height: 300, width: 300 }} />
        </motion.div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 9 }}>
        <Box
          sx={{ display: "flex", width: 700, justifyContent: "space-between" }}
        >
          <StatsDisplay
            value={userStats?.numTrades}
            description="trades made in total"
          />
          <StatsDisplay
            value={userStats?.cubicMeterSaving}
            description="cubic metres landfill reduced"
          />
          <StatsDisplay
            value={userStats?.carbonDioxideSaving}
            description="units estimated CO2 reduction"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 35 }}>
          Thanks for doing your bit for the
        </Typography>
        <Typography sx={{ fontSize: 35 }}>
          {communityStats?.name} community!
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <motion.div
          transition={{ y: { duration: 0.4, yoyo: Infinity, ease: "easeOut" } }}
          animate={{ backgroundColor: "white", y: ["30%", "-30%"] }}
        >
          <ArrowDropDownIcon sx={{ height: 80, width: 80 }} />
        </motion.div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Typography sx={{ fontSize: 35 }}>
          {communityStats?.name}'s environmental impact in{" "}
        </Typography>
        <FormControl sx={{ ml: 3 }}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={communityYear}
            label="Year"
            onChange={handleCommunityChange}
          >
            {validYears
              .slice(0)
              .reverse()
              .map((year) => (
                <MenuItem value={year}>{year}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <motion.div style={{ scale }}>
          <motion.div
            style={{
              scaleY: scrollYProgress,
            }}
          />
          {/* Replace with map view later*/}
          <Box sx={{ border: 1, width: 600, height: 400 }} />
        </motion.div>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 9 }}>
        <Box
          sx={{ display: "flex", width: 700, justifyContent: "space-between" }}
        >
          <StatsDisplay
            value={communityStats?.numTrades}
            description="trades made in total"
          />
          <StatsDisplay
            value={communityStats?.cubicMeterSaving}
            description="cubic metres landfill reduced"
          />
          <StatsDisplay
            value={communityStats?.carbonDioxideSaving}
            description="units estimated CO2 reduction"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 9, mb: 9 }}>
        <Button
          variant="outlined"
          sx={{ p: 1.5, borderRadius: 30 }}
          href="/environment/methodology"
        >
          How do we estimate these stats?
        </Button>
      </Box>
    </Template>
  );
};

export default Dashboard
