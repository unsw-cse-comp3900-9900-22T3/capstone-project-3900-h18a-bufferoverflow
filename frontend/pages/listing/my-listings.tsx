import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { itemDataToUserItemCard } from "../../components/listing/UserItemCard";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useStore } from "../../store/store";
import { GraphqlListing } from "../../@types/component.types";
import { MyListingsGraphqlProps } from "../../@types/pages.types";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const GET_USER_LISTINGS = gql`
  query ($userEmail: String!) {
    getListingsByUser(userEmail: $userEmail) {
      listings {
        title
        address
        price
        image
        user {
          displayImg
        }
        isSellListing
        id
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
  const [wantListings, setWantListings] = useState<GraphqlListing[]>([]);
  const [haveListings, setHaveListings] = useState<GraphqlListing[]>([]);

  useEffect(() => {
    if (data && data.getListingsByUser?.listings) {
      setWantListings(data.getListingsByUser.listings.filter(item => !item.isSellListing))
      setHaveListings(data.getListingsByUser.listings.filter((item) => item.isSellListing));
    }

  }, [data])

  return (
    <Template title="My Listings">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ width: "85vw", fontWeight: "bold", mt: 2, mb: 1 }}>
          My Want Listings
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "90vw" }}>
          {wantListings.map((item) => {
            return itemDataToUserItemCard(item);
          })}
        </Box>
        <Typography sx={{ width: "85vw", fontWeight: "bold", mt: 2, mb: 2 }}>
          My Have Listings
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "90vw" }}>
          {haveListings.map((item) => {
            return itemDataToUserItemCard(item);
          })}
        </Box>
      </Box>
    </Template>
  );
};

export default MyListings
