import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { gql, useQuery } from "@apollo/client";
import { useStore } from "../../store/store";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const GET_OFFERS = gql`
  query ($email: String!) {
    getTradeOffersByUser(userEmail: $email) {
      errors
      success
      tradeOffers {
        id
        listingOne {
          title
          user {
            displayImg
            username
          }
        }
        listingTwo {
          title
          user {
            displayImg
            username
          }
        }
      }
    }
  }
`

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const OffersList: NextPage = () => {

  const { auth } = useStore()
  const data = useQuery(GET_OFFERS, { variables: { email: auth?.email } }).data?.getTradeOffersByUser.tradeOffers

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
          data?.map((offer: any) => (
            <Link href={`/trade/offer?id=${offer.id}`}>
              <Box sx={{ width: '80vw', border: 0.5, display: 'flex', borderRadius: 2, justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={offer.listingTwo.user.displayImg} sx={{ m: 1.5, ml: 3, mr: 3 }} />
                  <Typography>{offer.listingTwo.user.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ ml: 3, mr: 3 }}>{offer.listingOne.title}</Typography>
                  <SwapHorizIcon sx={{ fontSize: 35 }} />
                  <Typography sx={{ ml: 3, mr: 3 }}>{offer.listingTwo.title}</Typography>
                </Box>
              </Box>
            </Link>
          ))
        }
      </Box>
    </Template>
  );
};

export default OffersList
