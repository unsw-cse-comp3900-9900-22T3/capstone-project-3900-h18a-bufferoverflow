import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useStore } from "../../store/store";

/////////////////////////////////////////////////////////////////////////////
// Query and Types
/////////////////////////////////////////////////////////////////////////////

const GET_FOLLOWING = gql`
  query getFollowingQuery($email: String!) {
    getFollowingList(userEmail: $email) {
      users {
        email
        displayImg
        username
      }
    }
  }
`

const UNFOLLOW = gql`
  mutation UnfollowQuery($email1: String!, $email2: String!) {
    unfollowUser(followerEmail: $email1, followedEmail: $email2) {
      success
      errors
    }
  }
`

interface FollowingTraderProps {
  displayImg: string;
  username: string;
  email: string;
}

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const FollowingTraders: NextPage = () => {

  const router = useRouter()
  const { auth } = useStore()

  const response = useQuery(GET_FOLLOWING, { variables: { email: auth?.email } }).data?.getFollowingList.users
  const [unfollow, _] = useMutation(UNFOLLOW);

  const [data, setData] = useState<FollowingTraderProps[]>([])

  useEffect(() => {
    if (response) setData([...response])
  }, [response])

  return (
    <Template title="Following Traders">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 1.5 }}>
          Following Traders
        </Typography>
        {
          data?.map(offer => (
            <Box sx={{ width: '80vw', border: 0.5, display: 'flex', borderRadius: 2, justifyContent: 'space-between', mb: 1 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}
                onClick={() => router.push(`/profile/visitor-profile?email=${offer.email}`)}
              >
                <Avatar src={offer.displayImg} sx={{ m: 1.5, ml: 3, mr: 3 }} />
                <Typography>{offer.username}</Typography>
              </Box>
              <Button
                sx={{ display: 'flex', zIndex: 10000 }}
                onClick={async () => {
                  await unfollow({ variables: { email1: auth?.email, email2: offer.email } })
                  const index = data.findIndex(x => x.email === offer.email)
                  data.splice(index, 1)
                  setData([...data])
                }}
              >
                <ClearIcon />
              </Button>
            </Box>
          ))
        }
      </Box>
    </Template>
  );
};

export default FollowingTraders
