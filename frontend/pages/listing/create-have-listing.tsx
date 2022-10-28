import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { ListingTemplate } from "../../components/listing/ListingTemplate";
import { gql, useMutation } from "@apollo/client";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const CREATE_LISTING_MUTATION = gql`
  mutation (
    $email: String!
    $title: String!
    $description: String!
    $sell: Boolean!
    $price: Float!
    $trade: Boolean!
    $cash: Boolean!
    $bank: Boolean!
    $status: String!
    $categories: [String]!
    $tradeCategories: [String]!
    $weight: Float
    $volume: Float
    $materials: [String]!
    $address: String!
    $image: String!
  ) {
    createListing(
      userEmail: $email,
      title: $title,
      description: $description,
      isSellListing: $sell,
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
      address: $address,
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

const CreateHaveListing: NextPage = () => {

  const [updateListing, { data, loading, error }] = useMutation(CREATE_LISTING_MUTATION);

  return (
    <Template title="Create Have Listing" center>
      <ListingTemplate have data={data} />
    </Template >
  );
};

export default CreateHaveListing
