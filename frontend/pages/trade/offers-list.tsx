import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

/////////////////////////////////////////////////////////////////////////////
// Mock Data
/////////////////////////////////////////////////////////////////////////////

const data = [
  {
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    name: 'Bobby',
    item1: 'Used Lego',
    item2: 'Used shoes',
    href: '/trade/offer'
  },
  {
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    name: 'Robby',
    item1: 'Used Lego',
    item2: 'Used shoes',
    href: '/trade/offer'
  },
  {
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    name: 'Bobby',
    item1: 'Used Lego',
    item2: 'Used shoes',
    href: '/trade/offer'
  }
]

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const OfferBar = (props: {
  avatar: string;
  name: string;
  item1: string;
  item2: string;
  href: string;
}) => {
  return (
    <Link href={props.href}>
      <Box sx={{ width: '80vw', border: 0.5, display: 'flex', borderRadius: 2, justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={props.avatar} sx={{ m: 1.5, ml: 3, mr: 3 }} />
          <Typography>{props.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ ml: 3, mr: 3 }}>{props.item1}</Typography>
          <SwapHorizIcon sx={{ fontSize: 35 }} />
          <Typography sx={{ ml: 3, mr: 3 }}>{props.item2}</Typography>
        </Box>
      </Box>
    </Link>
  )
}

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const OffersList: NextPage = () => {

  return (
    <Template title="Offers List">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 1.5 }}>
          My Received Offers
        </Typography>
        <Typography sx={{ width: '80vw', mb: 2.5 }}>
          You have received the following offers from traders
        </Typography>
        {
          data.map(offer => (<OfferBar {...offer} />))
        }
      </Box>
    </Template>
  );
};

export default OffersList
