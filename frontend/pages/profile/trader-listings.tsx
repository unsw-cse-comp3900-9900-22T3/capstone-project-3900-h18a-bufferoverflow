
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { mockItemCardRequest } from "../../utils/mockdata";
import { ItemCard, ItemCardProps } from "../../components/feed/ItemCard";
import { useRouter } from "next/router";

const TraderListings: NextPage = () => {

  const [data, setData] = useState<ItemCardProps[]>([])
  const router = useRouter()
  const { email } = router.query

  const username = 'Sean' // this should be fetched from api later

  // Pre-fill data once POST request is complete
  useEffect(() => {
    mockItemCardRequest()
      .then(data => setData(data))
  }, [])

  return (
    <Template title="Trader Listings">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 2.5 }}>
          {username}'s Want Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10 }}>
          {
            data.map(item => {
              if (item.want) {
                return <ItemCard {...item} href={`/detailed-listing/want?title=${item.title}`} />
              }
            })
          }
        </Box>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 2.5, mb: 2.5 }}>
          {username}'s Have Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10, mb: 10 }}>
          {
            data.map(item => {
              if (!item.want) {
                return <ItemCard {...item} href={`/detailed-listing/have?title=${item.title}`} />
              }
            })
          }
        </Box>
      </Box>
    </Template>
  );
};

export default TraderListings
