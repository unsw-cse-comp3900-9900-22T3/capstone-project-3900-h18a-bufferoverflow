import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Stack, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from '@emotion/styled'

const Grey = styled.div`
  color: #6b6b6b;
`

const Landing: NextPage = () => {
  return (
    <Template title="Swapr" center>
      <Stack id="landing-box" spacing={4}>
        <Typography variant="h1">Welcome to Swapr</Typography>
        <Grey>
          <Typography>
            A platform for trading secondhand items
          </Typography>
          <Typography>
            Create listings for something you have - or something you're looking
            for!
          </Typography>
        </Grey>
        <Box>
          <Button
            sx={{ textTransform: "none" }}
            href="/feed/default"
            variant="outlined"
            endIcon={<ArrowForwardIosIcon />}
          >
            Go To Listings
          </Button>
        </Box>
      </Stack>
    </Template>
  );
};

export default Landing;
