import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const EditHaveListing: NextPage = () => {
  return (
    <Template title="Edit Have Listing" center>
      <ListingTemplate have edit />
    </Template>
  );
};

export default EditHaveListing
