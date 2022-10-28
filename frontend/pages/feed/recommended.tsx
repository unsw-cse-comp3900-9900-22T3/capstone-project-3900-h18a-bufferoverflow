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
  const feed = useQuery<RecommendedFeedGraphqlProps>(GET_USER_FEED, { variables: { userEmail: auth?.email || '' } }).data;
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

  const [numberItems , setNumberItems ] = useState(0);

  const { data, refetch } = useQuery<SearchGraphqlProps>(GET_SEARCH_RESULTS, {
    variables: {
      categories: search.categories,
      distance: search.distance,
      isSellListing: search.listing === "have",
      priceMin: search.price.min,
      priceMax: search.price.max,
    },
  });
  
  useEffect(() => {
    if (!isSearch && feed?.userFeed?.listings) {
      setNumberItems(feed?.userFeed?.listings.length);
    }
  }, [data, feed]);

  return (
    <Template title="Swapr">
      <SearchBar
        data={search}
        setData={setSearch}
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
          {!isSearch ? "RecommendedFeed" : `${numberItems} Search Results`}
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
          {isSearch &&
            data?.searchListings?.listings?.map((item) => {
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
