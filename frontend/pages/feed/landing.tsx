import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ItemCard } from "../../components/feed/ItemCard";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Landing: NextPage = () => {
  return (
    <Template title="Swapr" center>
      <Box id="landing-box">
        <Box>
          <h1>Welcome to Swapr</h1>
          <p className="grey-body">A platform for trading secondhand items</p>
          <p className="grey-body">
            Create listings for something you have - or something you're looking
            for!
          </p>
          <Button
            sx={{ textTransform: "none" }}
            href="/feed/default"
            variant="outlined"
            endIcon={<ArrowForwardIosIcon/>}
          >
            Go To Listings
          </Button>
        </Box>
      </Box>
    </Template>
  );
};

export default Landing;
