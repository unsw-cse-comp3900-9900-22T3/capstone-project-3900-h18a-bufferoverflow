import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Card, Typography } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import StarIcon from "@mui/icons-material/Star";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { GET_FOLLOW, FOLLOW, UNFOLLOW } from "../../utils/queries";
import { ProfileGraphqlProps } from "../../@types/pages.types";

/////////////////////////////////////////////////////////////////////////////
// Data Types
/////////////////////////////////////////////////////////////////////////////

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
        community
      }
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const VisitorProfile: NextPage = () => {
  const router = useRouter();
  const { email } = router.query;
  const { data } = useQuery<ProfileGraphqlProps>(GET_USER_QUERY, {
    variables: { email },
  });
  const user = data?.getUser.user;
  const { auth } = useStore();
  const [following, setFollowing] = useState<boolean>(false);

  const response = useQuery(GET_FOLLOW, {
    variables: { email1: auth?.email, email2: email },
  }).data?.getFollowing.success;
  const [unfollow, _1] = useMutation(UNFOLLOW);
  const [follow, _2] = useMutation(FOLLOW);

  useEffect(() => {
    if (response) setFollowing(response);
  }, [response]);

  return (
    <Template title="Visitor Profile" center>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/** Left Section */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Card
            variant="outlined"
            sx={{ height: 300, width: 300, borderRadius: 100 }}
          >
            {user?.displayImg ? (
              <img
                src={user.displayImg}
                alt="profile"
                style={{ height: 300, width: 300 }}
              />
            ) : (
              <></>
            )}
          </Card>
          <Typography sx={{ fontSize: 20, mt: 3, mb: 5, textAlign: "center" }}>
            {user?.username}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {following ? (
              <DoneIcon fontSize="large" sx={{ mr: 4, color: "#616161" }} />
            ) : (
              <StarIcon fontSize="large" sx={{ mr: 4, color: "#616161" }} />
            )}
            <Button
              variant="outlined"
              sx={{ borderRadius: 30, width: "100%", mr: 3 }}
              onClick={async () => {
                if (following)
                  await unfollow({
                    variables: { email1: auth?.email, email2: email },
                  });
                else
                  await follow({
                    variables: { email1: auth?.email, email2: email },
                  });
                setFollowing(!following);
              }}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </Box>

        {/** Right Section */}
        <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
          <Typography sx={{ mb: 2.5, ml: 1 }}>About The Trader</Typography>
          <Card variant="outlined" sx={{ minHeight: 100, p: 1.5, mb: 3 }}>
            <Typography>{user?.bio}</Typography>
          </Card>
          <Typography sx={{ mb: 2.5, ml: 1 }}>Trader Location</Typography>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: 45,
              p: 1.5,
              mb: 5,
            }}
          >
            <Typography>{user?.community}</Typography>
          </Card>
          <Button
            variant="outlined"
            sx={{ borderRadius: 3 }}
            href={`/profile/trader-listings?email=${email}`}
          >
            View trader listings
          </Button>
        </Box>
      </Box>
    </Template>
  );
};

export default VisitorProfile;
