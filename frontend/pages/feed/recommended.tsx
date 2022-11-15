import { useStore } from "../../store/store";
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { itemDataToItemCard } from "../../components/feed/ItemCard";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchBar, SearchBarProps } from "../../components/feed/SearchBar";
import { MAX_DISTANCE, MAX_PRICE, MIN_PRICE } from "../../utils/globals";
import { useQuery, gql } from "@apollo/client";
import {
  RecommendedFeedGraphqlProps,
  SearchGraphqlProps,
  User,
  UserGraphqlProps,
} from "../../@types/pages.types";
import { GET_USER_QUERY } from "../../utils/queries";

/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

const GET_USER_FEED = gql`
  query ($userEmail: String!) {
    userFeed(userEmail: $userEmail) {
      listings {
        id
        title
        address
        price
        image
        user {
          displayImg
        }
        isSellListing
      }
    }
  }
`;

const GET_USER_SEARCH_RESULTS = gql`
  query (
    $categories: [String]
    $distance: Int
    $isSellListing: Boolean
    $priceMin: Float
    $priceMax: Float
    $userEmail: String
  ) {
    searchListings(
      categories: $categories
      distance: $distance
      isSellListing: $isSellListing
      priceMin: $priceMin
      priceMax: $priceMax
      userEmail: $userEmail
    ) {
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

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const RecommendedFeed: NextPage = () => {
  const { auth } = useStore();
  const feed = useQuery<RecommendedFeedGraphqlProps>(GET_USER_FEED, {
    variables: { userEmail: auth?.email || "" },
  }).data;
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState<SearchBarProps>({
    categories: [],
    price: {
      max: MAX_PRICE,
      min: MIN_PRICE,
    },
    listing: "have",
    distance: MAX_DISTANCE,
  });

  const [numberItems, setNumberItems] = useState(0);

  const { data, refetch } = useQuery<SearchGraphqlProps>(
    GET_USER_SEARCH_RESULTS,
    {
      variables: {
        categories: search.categories,
        distance: search.distance,
        isSellListing: search.listing === "have",
        priceMin: search.price.min,
        priceMax: search.price.max,
        userEmail: auth?.email,
      },
    }
  );

  useEffect(() => {
    if (!isSearch && feed?.userFeed?.listings) {
      setNumberItems(feed?.userFeed?.listings.length);
    }
  }, [data, feed]);

  const [user, setUser] = useState<User>();
  const user_response = useQuery<UserGraphqlProps>(GET_USER_QUERY, {
    variables: { email: auth?.email || "" },
  });
  useEffect(() => {
    if (user_response.data?.getUser.user) {
      setUser(user_response.data?.getUser.user);
    }
  }, [user_response]);

  return (
    <Template title="Swapr">
      <SearchBar
        data={search}
        setData={setSearch}
        distanceAllowed={auth !== null && auth?.email !== "" && user?.address !== ""}
        onSearch={() => {
          setIsSearch(true);
          refetch({
            categories: search.categories,
            distance: search.distance,
            isSellListing: search.listing === "have",
            priceMin: search.price.min,
            priceMax: search.price.max,
          });
          if (data && data?.searchListings?.listings) {
            setNumberItems(data?.searchListings?.listings.length);
          }
        }}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          sx={{ width: "80vw", fontWeight: "bold", mt: 3.5, mb: 2.5 }}
        >
          {!isSearch ? "Recommended Feed" : `${numberItems} Search Results`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "90vw",
            pl: 10,
            mb: 10,
          }}
        >
          {!isSearch &&
            feed?.userFeed.listings
              ?.filter((item) => item.isSellListing)
              .map((item) => {
                return itemDataToItemCard(item);
              })}
          {isSearch &&
            data?.searchListings?.listings?.map((item) => {
              return itemDataToItemCard(item);
            })}
        </Box>
      </Box>
    </Template>
  );
};

export default RecommendedFeed;
