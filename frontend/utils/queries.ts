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
        latitude
        longitude
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
        latitude
        longitude
      }
      errors
      success
    }
  }
`;

export const GET_USER_LISTINGS = gql`
  query ($userEmail: String!) {
    getListingsByUser(userEmail: $userEmail) {
      listings {
        title
        address
        price
        image
        user {
          displayImg
        }
        isSellListing
        id
      }
    }
  }
`;

export const GET_FOLLOW = gql`
  query getFollowingQuery($email1: String!, $email2: String!) {
    getFollowing(userEmail: $email1, checkFollowerEmail: $email2) {
      success
      errors
    }
  }
`;

export const UNFOLLOW = gql`
  mutation UnfollowQuery($email1: String!, $email2: String!) {
    unfollowUser(followerEmail: $email1, followedEmail: $email2) {
      success
      errors
    }
  }
`;

export const FOLLOW = gql`
  mutation followQuery($email1: String!, $email2: String!) {
    followUser(followerEmail: $email1, followedEmail: $email2) {
      success
      errors
    }
  }
`;
