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