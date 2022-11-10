import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { itemDataToItemCard } from "../../components/feed/ItemCard";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const GET_OFFER_LISTINGS = gql`
  query ($id: ID!) {
    getListingsInTradeOffer(tradeOfferId: $id) {
      errors
      success
      listings {
        id
        title
        price
        image
        address
        user {
          email
          username
          displayImg
        }
        isSellListing
      }
    }
  }
`

const UPDATE_OFFER = gql`
  mutation ($id: ID!, $accepted: Boolean!) {
    updateTradeOffer(id: $id, isAccepted: $accepted) {
      success
      errors
    }
  }
`

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const Offer: NextPage = () => {

  const router = useRouter()
  const { id } = router.query

  const data = useQuery(GET_OFFER_LISTINGS, { variables: { id } }).data?.getListingsInTradeOffer.listings
  const [updateOffer, _] = useMutation(UPDATE_OFFER)

  const swapper = data ? data[0] : {}
  const swappee = data ? data[1] : {}

  return (
    <Template title="Offer" center>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: 17, mb: 2 }}>Trade Offer</Typography>
        <Typography sx={{ mb: 4 }}>Please accept or decline the trade offer from</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 7 }}>
          <Avatar src={swappee.user?.displayImg} sx={{ mr: 2 }} />
          <Typography>{swappee.user?.username}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
          {data ? itemDataToItemCard(swapper) : <></>}
          <SwapHorizIcon sx={{ fontSize: 70 }} />
          {data ? itemDataToItemCard(swappee) : <></>}
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 5 }}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 30, mr: 0.5, width: 300, height: 45 }}
            onClick={async () => {
              await updateOffer({ variables: { id, accepted: true } })
              router.push(`/trade/success?title=${swappee.title}&price=${swappee.price}&image=${swappee.image}&address=${swappee.address}&avatar=${swappee.user?.displayImg}&email=${swappee.user?.email}`)
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            sx={{ borderRadius: 30, ml: 0.5, width: 300, height: 45 }}
            onClick={async () => {
              await updateOffer({ variables: { id, accepted: false } })
              router.push('/')
            }}
          >
            Decline
          </Button>
        </Box>
      </Box>
    </Template >
  );
};

export default Offer
