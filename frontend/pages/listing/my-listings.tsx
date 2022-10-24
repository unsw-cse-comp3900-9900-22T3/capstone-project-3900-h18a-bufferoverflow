import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ItemCard, ItemCardProps } from "../../components/feed/ItemCard";
import { useEffect, useState } from "react";
import { mockItemCardRequest } from "../../utils/mockdata";

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const MyListings: NextPage = () => {

  const [data, setData] = useState<ItemCardProps[]>([])

  // Pre-fill data once POST request is complete
  useEffect(() => {
    mockItemCardRequest()
      .then(data => setData(data))
  }, [])

  return (
    <Template title="My Listings">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          My Want Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
          {
            data.map(item => {
              if (item.want) {
                return <ItemCard {...item} href='/listing/edit-want-listing' />
              }
            })
          }
        </Box>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 2 }}>
          My Have Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
          {
            data.map(item => {
              if (!item.want) {
                return <ItemCard {...item} href='/listing/edit-have-listing' />
              }
            })
          }
        </Box>
      </Box>
    </Template>
  );
};

export default MyListings
