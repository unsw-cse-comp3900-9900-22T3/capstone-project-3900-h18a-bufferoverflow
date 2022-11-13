import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { itemDataToItemCard } from "../../components/feed/ItemCard";
import { GraphqlListing } from "../../components/listing/types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchBar, SearchBarProps } from "../../components/feed/SearchBar";
import { MAX_DISTANCE, MAX_PRICE, MIN_PRICE } from "../../utils/globals";
import { useQuery, gql } from "@apollo/client";
import { useStore } from "../../store/store";
import { User, UserGraphqlProps } from "../../utlis/user";

/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

interface DefaultFeedGraphqlProps {
  defaultFeed: {
    success: boolean | null;
    errors: string[] | null;
    listings: GraphqlListing[] | null;
  };
}

export const GET_DEFAULT_FEED = gql`
  query {
    defaultFeed {
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
export interface SearchGraphqlProps {
  searchListings: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: GraphqlListing[];
  };
}

export const GET_SEARCH_RESULTS = gql`
  query (
    $categories: [String]
    $distance: Int
    $isSellListing: Boolean
    $priceMin: Float
    $priceMax: Float
  ) {
    searchListings(
      categories: $categories
      distance: $distance
      isSellListing: $isSellListing
      priceMin: $priceMin
      priceMax: $priceMax
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

const GET_USER_QUERY = gql`
  query getUserQuery($email: String!) {
    getUser(email: $email) {
      errors
      success
      user {
        address
      }
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DefaultFeed: NextPage = () => {
  const { auth } = useStore();

  const feed = useQuery<DefaultFeedGraphqlProps>(GET_DEFAULT_FEED).data;
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

  const { data, refetch } = useQuery<SearchGraphqlProps>(GET_SEARCH_RESULTS, {
    variables: {
      categories: search.categories,
      distance: search.distance,
      isSellListing: search.listing === "have",
      priceMin: search.price.min,
      priceMax: search.price.max,
    },
  });

  const [numberItems, setNumberItems] = useState(0);

  useEffect(() => {
    if (!isSearch && feed && feed.defaultFeed?.listings) {
      setNumberItems(
        feed.defaultFeed.listings.filter((item) => item.isSellListing).length
      );
    }
  }, [data, feed]);

  const [user, setUser] = useState<User>({});
  const user_response = useQuery<UserGraphqlProps>(GET_USER_QUERY, {
    variables: { email: auth?.email || "" },
  });
  useEffect(() => {
    if (user_response.data?.getUser.user) {
      setUser({
        address: user_response.data?.getUser.user.address
      });
    }
  }, [user_response]);

  return (
    <Template title="Swapr">
      <SearchBar
        data={search}
        setData={setSearch}
        distanceAllowed={auth != undefined && auth?.email != "" && user.address}
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
        ></Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "90vw",
            pl: 10,
            mb: 10,
          }}
        >
          <Typography
            sx={{ width: "80vw", fontWeight: "bold", mt: 3.5, mb: 2.5 }}
          >
            {numberItems} {!isSearch ? "Items For Sale" : "Search Results"}
          </Typography>
          {!isSearch &&
            feed?.defaultFeed?.listings
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

export default DefaultFeed;
