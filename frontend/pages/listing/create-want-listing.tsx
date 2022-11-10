import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const CreateWantListing: NextPage = () => {
  return (
    <Template title="Create Want Listing" center>
      <ListingTemplate />
    </Template>
  );
};

export default CreateWantListing
