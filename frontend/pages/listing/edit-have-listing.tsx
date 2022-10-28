import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";
import { gql } from "@apollo/client";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const UPDATE_LISTING_MUTATION = gql`
  mutation (
    $id: ID!
    $title: String
    $description: String
    $price: Float
    $trade: Boolean
    $cash: Boolean
    $bank: Boolean
    $status: String
    $categories: [String]
    $tradeCategories: [String]
    $weight: Float
    $volume: Float
    $materials: [String]
    $location: String
    $image: String
  ) {
    updateListing(
      id: $id,
      title: $title,
      description: $description,
      price: $price,
      canTrade: $trade,
      canPayCash: $cash,
      canPayBank: $bank,
      status: $status,
      categories: $categories,
      wantToTradeFor: $tradeCategories,
      weight: $weight,
      volume: $volume,
      materials: $materials,
      address: $location,
      image: $image,
    ) {
      errors
      success
    }
  }
`

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
