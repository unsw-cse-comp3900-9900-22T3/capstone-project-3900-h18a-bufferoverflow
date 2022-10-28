import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const CreateHaveListing: NextPage = () => {
  return (
    <Template title="Create Have Listing" center>
      <ListingTemplate have />
    </Template >
  );
};

export default CreateHaveListing
