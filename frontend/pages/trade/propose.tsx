import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ItemCard } from "../../components/feed/ItemCard";
import { useEffect, useState } from "react";
import { Toast } from "../../components/generic/Toast";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GraphqlListing } from "../../components/listing/types";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const GET_USER_LISTINGS = gql`
  query ($email: String!) {
    getListingsByUser(userEmail: $email) {
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
`

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const Propose: NextPage = () => {

  const router = useRouter()
  const { email } = router.query
  const data = useQuery(GET_USER_LISTINGS, { variables: { email } }).data?.getListingsByUser.listings as GraphqlListing[]

  const [successToast, setSuccessToast] = useState<string>('');

  return (
    <Template title="Propose">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Toast toast={successToast} setToast={setSuccessToast} type='success' />
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 1.5 }}>
          Propose a Trade
        </Typography>
        <Typography sx={{ width: '80vw', mb: 2.5 }}>
          Select an item from your have listings to propose
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10, mb: 10 }}>
          {
            data?.map(item => {
              return (
                <ItemCard
                  location={item.address}
                  avatar={item.user.displayImg}
                  {...item}
                  onClick={async () => {
                    // Call propose trade api here
                    setSuccessToast('Trade Proposed Successfully');
                    router.push('/')
                  }}
                />
              )
            })
          }
        </Box>
      </Box>
    </Template>
  );
};

export default Propose
