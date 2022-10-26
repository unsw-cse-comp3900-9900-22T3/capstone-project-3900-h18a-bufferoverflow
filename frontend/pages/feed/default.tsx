import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard } from '../../components/feed/ItemCard'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { SearchBar, SearchBarProps } from '../../components/feed/SearchBar'
import { MAX_DISTANCE, MAX_PRICE, MIN_PRICE } from '../../utils/globals'
import { useQuery, gql } from "@apollo/client";

/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

interface DefaultFeedGraphqlProps {
  defaultFeed: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: GraphqlListing[] | null;
  };
}

export interface GraphqlListing {
  title: string;
  description: string;
  price: number;
  images: string;
  address: string;
  user: GraphqlUser;
  isSellListing: boolean;
}

interface GraphqlUser {
  displayImg: string;
}


export const GET_DEFAULT_FEED = gql`
  query {
    defaultFeed {
      listings {
        title
        description
        address
        price
        images
        user {
          displayImg
        }
        isSellListing
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
  query ($category: [String], $distance: Int, $isSellListing : Boolean, $priceMin: Float, $priceMax: Float) {
    searchListings(category: $category, distance: $distance, isSellListing: $isSellListing, priceMin : $priceMin, priceMax : $priceMax) {
      listings {
        title
        description
        address
        price
        images
        user {
          displayImg
        }
        isSellListing
      }
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DefaultFeed: NextPage = () => {

  const { data } = useQuery<DefaultFeedGraphqlProps>(GET_DEFAULT_FEED);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState<SearchBarProps>({
    categories: [],
    price: {
      max: MAX_PRICE,
      min: MIN_PRICE,
    },
    listing: 'have',
    distance: MAX_DISTANCE
  })
  var searchResults = useQuery<SearchGraphqlProps>(GET_SEARCH_RESULTS, {
      variables: {
        category: search.categories,
        distance: search.distance,
        isSellListing: search.listing == "have",
        priceMin: search.price.min,
        priceMax: search.price.max,
      },
  })?.data;

  var numberItems: number = 0

  useEffect(() =>{
    // update searchResults using gql if user has made a search
    if (isSearch) {
      searchResults = useQuery<SearchGraphqlProps>(GET_SEARCH_RESULTS, {
        variables: {
          category: search.categories,
          distance: search.distance,
          isSellListing: search.listing == "have",
          priceMin: search.price.min,
          priceMax: search.price.max,
        },
      })?.data;
    // else, show default feed
    } else if (data && data.defaultFeed.listings) {
      numberItems = data.defaultFeed.listings.length;
    }
  }, [data, isSearch])

  return (
    <Template title="Swapr">
      <SearchBar
        data={search}
        setData={setSearch}
        onSearch={() => {setIsSearch(true);}}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          sx={{ width: "80vw", fontWeight: "bold", mt: 3.5, mb: 2.5 }}
        >
          {numberItems} Items for Sale
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
          {isSearch &&
            searchResults?.searchListings?.listings?.map((item) => {
              return (
                <ItemCard
                  title={item.title}
                  price={item.price}
                  image={item.images}
                  avatar={item.user.displayImg}
                  location={item.address}
                  href={
                    item.isSellListing
                      ? "/detailed-listing/have"
                      : "/detailed-listing/want"
                  }
                />
              );
            })}
          {!isSearch && data?.defaultFeed.listings?.map((item) => {
            return (
              <ItemCard
                title={item.title}
                price={item.price}
                image={item.images}
                avatar={item.user.displayImg}
                location={item.address}
                href={
                  item.isSellListing
                    ? "/detailed-listing/have"
                    : "/detailed-listing/want"
                }
              />
            );
          })}
        </Box>
      </Box>
    </Template>
  );
}

export default DefaultFeed



