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

   
  const { data, error, refetch } = useQuery<SearchGraphqlProps>(GET_SEARCH_RESULTS, {
    variables: {
      category: search.categories,
      distance: search.distance,
      isSellListing: search.listing === "have",
      priceMin: search.price.min,
      priceMax: search.price.max,
    },
  });
  


  useEffect(() => {
    if (isSearch && data && data.searchListings?.success) {
      setNumberItems(data.searchListings.listings.length);
    }
  }, [data]);

  

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
          

          console.log(search.categories);
          console.log(search.distance);
          console.log(search.listing);
          console.log(search.price.min);
          console.log(search.price.max);

          refetch({
            category: search.categories,
            distance: search.distance,
            isSellListing: search.listing === "have",
            priceMin: search.price.min,
            priceMax: search.price.max,
          });
          console.log(search.price.min);
          console.log(data?.searchListings.listings);
          
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

          {!isSearch &&
            // filter to only show 'have' listings by default
            feed?.userFeed.listings
              ?.filter((item) => {
                item.isSellListing;
              })
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
        </Box>
      </Box>
    </Template>
  );
}

export default RecommendedFeed
