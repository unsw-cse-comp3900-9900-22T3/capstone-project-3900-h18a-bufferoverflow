import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useState } from 'react';
import { ItemCard } from '../../components/feed/ItemCard'
import { SearchBar, SearchBarProps } from '../../components/feed/SearchBar';
import { Template } from '../../components/generic/Template'
import { GET_DEFAULT_FEED, FeedGraphqlProps } from './default';
import { MAX_DISTANCE, MAX_PRICE, MIN_PRICE } from '../../utils/globals';
import { useQuery, gql } from "@apollo/client"
import { useStore } from '../../store/store';


/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const RecommendedFeed: NextPage = () => {
  const { auth } = useStore();


  const { data } = useQuery<FeedGraphqlProps>(GET_DEFAULT_FEED);
  const [search, setSearch] = useState<SearchBarProps>({
    categories: [],
    price: {
      max: MAX_PRICE,
      min: MIN_PRICE,
    },
    listing: 'have',
    distance: MAX_DISTANCE
  })

  return (
    <Template title="Swapr">
      <SearchBar
        data={search}
        setData={setSearch}
        onSearch={() => console.log(search)}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          sx={{ width: "80vw", fontWeight: "bold", mt: 3.5, mb: 2.5 }}
        >
          Recommended Feed
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
          {data?.defaultFeed.listings?.map(item => {
              return <ItemCard
                title={item.title}
                price={item.price}
                image={item.images}
                avatar={item.user.displayImg}
                location={item.address} 
                href={item.isSellListing ? "/detailed-listing/have" : "/detailed-listing/want"} 
                />; 
          })
          
          /*dataR.map(item => {
              const href = item.want ? '/detailed-listing/want' : '/detailed-listing/have'
              return <ItemCard {...item} href={href} /> 
            }
            )*/
            
          }
        </Box>
      </Box>
    </Template>
  );
}

export default RecommendedFeed
