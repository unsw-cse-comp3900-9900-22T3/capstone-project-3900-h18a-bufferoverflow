
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Typography } from "@mui/material";
import { singleItemCardData } from "../../utils/mockdata";
import { ItemCard } from "../../components/feed/ItemCard";

const Success: NextPage = () => {

  const tradedItem = singleItemCardData(true)

  return (
    <Template title="Success" center>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: 17, mb: 2 }}>Congratulations!</Typography>
        <Typography sx={{ mb: 6 }}>You have successfully agreed to a mutual trade</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <ItemCard {...tradedItem} href={`/detailed-listing/have?title=${tradedItem.title}`} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
            <Typography sx={{ mb: 5, width: 240, textAlign: 'center', fontWeight: 'bold' }}>
              Message the user to arrange the exchange
            </Typography>
            <Button variant="outlined" sx={{ borderRadius: 30, width: 240, height: 45 }} href='/chat/chat'>
              Message User
            </Button>
          </Box>
        </Box>
      </Box>
    </Template>
  );
};

export default Success
