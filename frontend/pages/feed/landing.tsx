import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Stack, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Landing: NextPage = () => {
  return (
    <Template title="Swapr" center>
      <Stack id="landing-box" spacing={2}>
        <Typography variant="h1">Welcome to Swapr</Typography>
        <Typography variant="body1">
          A platform for trading secondhand items
        </Typography>
        <Typography variant="body1">
          Create listings for something you have - or something you're looking
          for!
        </Typography>
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
