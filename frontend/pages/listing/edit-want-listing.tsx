import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";
import { Box } from "@mui/material";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const EditWantListing: NextPage = () => {
  return (
    <Template title="Edit Want Listing">
      <Box sx={{ mt: 4, mb: 4 }}>
        <ListingTemplate edit />
      </Box>
    </Template>
  );
};

export default EditWantListing
