import { gql } from "@apollo/client";

// query for user in feed - just needs to know if they have an address
export const GET_USER_QUERY = gql`
  query getUserQuery($email: String!) {
    getUser(email: $email) {
      errors
      success
      user {
        username
        displayImg
        id
        address
      }
    }
  }
`;

export const GET_DETAILED_LISTING = gql`
  query ($id: ID!) {
    getListing(id: $id) {
      listing {
        id
        user {
          username
          displayImg
          email
        }
        title
        categories {
          type
        }
        wantToTradeFor {
          type
        }
        image
        description
        address
        price
        canTrade
        canPayCash
        canPayBank
      }
      errors
      success
    }
  }
`;

export const GET_USER_DETAILED_LISTING = gql`
  query ($id: ID!, $userEmail: String) {
    getListing(id: $id, userEmail: $userEmail) {
      listing {
        id
        user {
          username
          displayImg
          email
        }
        title
        categories {
          type
        }
        wantToTradeFor {
          type
        }
        image
        description
        address
        price
        canTrade
        canPayCash
        canPayBank
      }
      errors
      success
    }
  }
`;
