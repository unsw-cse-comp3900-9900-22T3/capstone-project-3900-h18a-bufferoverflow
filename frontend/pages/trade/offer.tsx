import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { singleItemCardData } from "../../utils/mockdata";
import { itemDataToItemCard } from "../../components/feed/ItemCard";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const Offer: NextPage = () => {

  const swapper = singleItemCardData(true)
  const swappee = singleItemCardData(true)

  return (
    <Template title="Offer" center>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: 17, mb: 2 }}>Trade Offer</Typography>
        <Typography sx={{ mb: 4 }}>Please accept or decline the trade offer from</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 7 }}>
          <Avatar src={swapper.avatar} sx={{ mr: 2 }} />
          <Typography>Bobby</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
          {itemDataToItemCard(swapper)}
          <SwapHorizIcon sx={{ fontSize: 70 }} />
          {itemDataToItemCard(swappee)}
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 5 }}>
          <Button variant="outlined" sx={{ borderRadius: 30, mr: 0.5, width: 300, height: 45 }} href='/trade/success'>
            Accept
          </Button>
          <Button variant="outlined" sx={{ borderRadius: 30, ml: 0.5, width: 300, height: 45 }}>
            Decline
          </Button>
        </Box>
      </Box>
    </Template>
  );
};

export default Offer
