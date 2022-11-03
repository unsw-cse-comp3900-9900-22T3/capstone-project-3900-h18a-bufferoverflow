import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";
import { Box } from "@mui/material";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const CreateWantListing: NextPage = () => {
  return (
    <Template title="Create Want Listing">
      <Box sx={{ mt: 4, mb: 4 }}>
        <ListingTemplate />
      </Box>
    </Template>
  );
};

export default CreateWantListing
