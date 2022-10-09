import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ItemCard } from "../../components/feed/ItemCard";

const MyListings: NextPage = () => {
  return (
    <Template title="My Listings">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          My Want Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </Box>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 2 }}>
          My Have Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </Box>
      </Box>
    </Template>
  );
};

export default MyListings
