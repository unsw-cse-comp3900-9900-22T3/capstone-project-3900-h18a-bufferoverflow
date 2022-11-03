import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";
import { Box } from "@mui/material";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const EditHaveListing: NextPage = () => {
  return (
    <Template title="Edit Have Listing">
      <Box sx={{ mt: 4, mb: 4 }}>
        <ListingTemplate have edit />
      </Box>
    </Template>
  );
};

export default EditHaveListing
