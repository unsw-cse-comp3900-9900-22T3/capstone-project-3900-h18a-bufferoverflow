
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ItemCard } from "../../components/feed/ItemCard";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const GET_LISTINGS = gql`
  query getListingsQuery($email: String!) {
    getListingsByUser(userEmail: $email) {
      errors
      success
      listings {
        title
        id
        image
        price
        address
        user {
          displayImg
        }
        isSellListing
      }
    }
  }
`

interface ListingProp {
  id: number;
  title: string;
  image: string;
  price: number;
  address: string;
  user: {
    displayImg: string;
  }
  isSellListing: boolean;
}

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const TraderListings: NextPage = () => {

  const router = useRouter()
  const { email } = router.query

  const data = useQuery(GET_LISTINGS, { variables: { email } }).data?.getListingsByUser.listings as ListingProp[]

  const username = 'Sean' // this should be fetched from api later

  return (
    <Template title="Trader Listings">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 2.5 }}>
          {username}'s Want Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10 }}>
          {
            data?.map(item => {
              if (!item.isSellListing) {
                return <ItemCard
                  {...item}
                  location={item.address}
                  avatar={item.user.displayImg}
                  href={`/detailed-listing/want?id=${item.id}`}
                />
              }
            })
          }
        </Box>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 2.5, mb: 2.5 }}>
          {username}'s Have Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10, mb: 10 }}>
          {
            data?.map(item => {
              if (item.isSellListing) {
                return <ItemCard
                  {...item}
                  location={item.address}
                  avatar={item.user.displayImg}
                  href={`/detailed-listing/have?id=${item.id}`}
                />
              }
            })
          }
        </Box>
      </Box>
    </Template>
  );
};

export default TraderListings
