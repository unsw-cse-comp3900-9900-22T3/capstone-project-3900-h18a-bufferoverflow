import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import {
  itemDataToItemCard,
  GraphqlListing,
} from "../../components/feed/ItemCard";
import { useEffect, useState } from "react";
import { mockItemCardRequest } from "../../utils/mockdata";
import { gql, useQuery } from "@apollo/client";
import { useStore } from "../../store/store";

/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

export interface MyListingsGraphqlProps {
  getListingsByUser: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: GraphqlListing[] | null;
  };
}

const GET_USER_LISTINGS = gql`
  query ($userEmail: String!) {
    getListingsByUser(userEmail: $userEmail) {
      listings {
        title
        description
        address
        price
        image
        isSellListing
      }
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const MyListings: NextPage = () => {

  const { auth } = useStore();
  const { data } = useQuery<MyListingsGraphqlProps>(GET_USER_LISTINGS, {
    variables: { userEmail: auth?.email || "" },
  });

  // Pre-fill data once POST request is complete
  useEffect(() => {

  }, [])

  return (
    <Template title="My Listings">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          My Want Listings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
          {
            data?.map(item => {
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
            data?.map(item => {
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
