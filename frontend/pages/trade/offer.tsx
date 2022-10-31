import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { itemDataToItemCard } from "../../components/feed/ItemCard";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { GraphqlListing } from "../../components/listing/types";

const Offer: NextPage = () => {

  const swapper: GraphqlListing = {
    title: "asf fds",
    id: 1,
    price: 123,
    image: 'https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    address: "34 wonderland",
    user: {
      displayImg: 'https://mui.com/static/images/avatar/3.jpg'
    },
    isSellListing: false
  }
  const swapperAvatar = 'https://mui.com/static/images/avatar/3.jpg'

  return (
    <Template title="Offer" center>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: 17, mb: 2 }}>Trade Offer</Typography>
        <Typography sx={{ mb: 4 }}>Please accept or decline the trade offer from</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 7 }}>
          <Avatar src={swapperAvatar} sx={{ mr: 2 }} />
          <Typography>Bobby</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
          {itemDataToItemCard(swapper)}
          <SwapHorizIcon sx={{ fontSize: 70 }} />
          {itemDataToItemCard(swapper)}
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
