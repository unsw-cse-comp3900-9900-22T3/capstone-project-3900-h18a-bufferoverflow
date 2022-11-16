import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const EditWantListing: NextPage = () => {
  return (
    <Template title="Edit Want Listing">
      <ListingTemplate edit />
    </Template>
  );
};

export default EditWantListing
