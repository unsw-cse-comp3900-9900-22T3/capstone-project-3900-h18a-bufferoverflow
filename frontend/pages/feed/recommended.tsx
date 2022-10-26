import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useState , useEffect } from 'react';
import { ItemCard } from '../../components/feed/ItemCard'
import { SearchBar, SearchBarProps } from '../../components/feed/SearchBar';
import { Template } from '../../components/generic/Template'
import { GraphqlListing, SearchGraphqlProps, GET_SEARCH_RESULTS } from './default';
import { MAX_DISTANCE, MAX_PRICE, MIN_PRICE } from '../../utils/globals';
import { useQuery, gql } from "@apollo/client"
import { useStore } from '../../store/store';


/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

export interface RecommendedFeedGraphqlProps {
  userFeed: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: GraphqlListing[] | null;
  };
}

const GET_USER_FEED = gql`
  query($userEmail : String!) {
    userFeed(userEmail : $userEmail) {
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

const RecommendedFeed: NextPage = () => {
  const { auth } = useStore();
  const { data } = useQuery<RecommendedFeedGraphqlProps>(GET_USER_FEED, { variables: { userEmail: auth?.email || '' } });
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

  var numberItems: number = 0;

  useEffect(() => {
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
      
      const count = searchResults?.searchListings.listings
      if (count) {
        numberItems = count.length;
      }
      
    }
  }, [data, search]);

  const heading = !isSearch ? (
    <Typography sx={{ width: "80vw", fontWeight: "bold", mt: 3.5, mb: 2.5 }}>
      Recommended Feed
    </Typography>
  ) : (
    <Typography sx={{ width: "80vw", fontWeight: "bold", mt: 3.5, mb: 2.5 }}>
      {numberItems} Search Results
    </Typography>
  );

  return (
    <Template title="Swapr">
      <SearchBar
        data={search}
        setData={setSearch}
        onSearch={() => {
          setIsSearch(true);
        }}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {heading}
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
          {!isSearch && data?.userFeed.listings?.map((item) => {
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

export default RecommendedFeed
