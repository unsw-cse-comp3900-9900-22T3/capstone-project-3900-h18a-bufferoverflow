import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Card, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useRouter } from "next/router";
import { ListingProps } from "../../components/listing/types";
import { ListingTemplate } from "../../components/listing/ListingTemplate";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const EditHaveListing: NextPage = () => {
  return (
    <Template title="Edit Have Listing">
      <ListingTemplate />
    </Template>
  );
};

export default EditHaveListing
