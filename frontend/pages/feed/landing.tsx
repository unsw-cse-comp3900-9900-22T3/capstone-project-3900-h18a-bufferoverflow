import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Landing: NextPage = () => {
  return (
    <Template title="Swapr" center>
      <Box id="landing-box">
        <h1>Welcome to Swapr</h1>
        <Typography variant="body1">A platform for trading secondhand items</Typography>
        <Typography variant="body1">
          Create listings for something you have - or something you're looking
          for!
        </Typography>
        <Button
          sx={{ textTransform: "none" }}
          href="/feed/default"
          variant="outlined"
          endIcon={<ArrowForwardIosIcon />}
        >
          Go To Listings
        </Button>
      </Box>
    </Template>
  );
};

export default Landing;
