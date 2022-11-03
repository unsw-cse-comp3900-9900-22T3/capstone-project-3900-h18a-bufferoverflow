import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";
import { Box } from "@mui/material";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const CreateHaveListing: NextPage = () => {
  return (
    <Template title="Create Have Listing">
      <Box sx={{ mt: 4, mb: 4 }}>
        <ListingTemplate have />
      </Box>
    </Template >
  );
};

export default CreateHaveListing
