import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Card, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

/////////////////////////////////////////////////////////////////////////////
// Data Types
/////////////////////////////////////////////////////////////////////////////

interface ProfileGraphqlProps {
  getUser: {
    success: boolean | null;
    erorrs: string[] | null;
    user: {
      displayImg: string;
      username: string;
      bio: string;
      address: string;
    } | null;
  }
}

const GET_USER_QUERY = gql`
  query getUserQuery($email: String!) {
    getUser(email: $email) {
      errors
      success
      user {
        displayImg
        username
        email
        bio
      }
    }
  }
`

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const VisitorProfile: NextPage = () => {

  const router = useRouter()
  const { email } = router.query
  const { data } = useQuery<ProfileGraphqlProps>(GET_USER_QUERY, { variables: { email } })
  const user = data?.getUser.user

  return (
    <Template title="Visitor Profile" center>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>

        {/** Left Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Card variant="outlined" sx={{ height: 300, width: 300, borderRadius: 100 }}>
            {
              user?.displayImg
                ? <img src={user.displayImg} alt='profile' style={{ height: 300, width: 300 }} />
                : <></>
            }
          </Card>
          <Typography sx={{ fontSize: 20, mt: 4, textAlign: 'center' }}>{user?.username}</Typography>
          <Button variant="outlined" sx={{ borderRadius: 30 }} onClick={async () => { }}>
            Follow
          </Button>
        </Box>

        {/** Right Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          <Typography sx={{ mb: 2 }}>Public Information</Typography>
        </Box>

      </Box>
    </Template>
  );
};

export default VisitorProfile
