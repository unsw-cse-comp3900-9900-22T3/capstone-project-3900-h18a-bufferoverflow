import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard, ItemCardProps } from '../../components/feed/ItemCard'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { mockItemCardRequest } from '../../utils/mockdata'
import { SearchBar, SearchBarProps } from '../../components/feed/SearchBar'
import { MAX_DISTANCE, MAX_PRICE, MIN_PRICE } from '../../utils/globals'
import { useQuery, gql } from "@apollo/client";

/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

export interface FeedGraphqlProps {
  defaultFeed: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: GraphqlListing[] | null;
  };
}

interface GraphqlListing {
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

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DefaultFeed: NextPage = () => {

  // const { data } = useQuery<ItemCardProps[]>(GET_FEED);

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

  var numberItems: number = 0

  useEffect(() =>{
    if (data && data.defaultFeed.listings) {
      numberItems = data.defaultFeed.listings.length
    }
  }, [data])

  return (
    <Template title='Swapr'>
      <SearchBar data={search} setData={setSearch} onSearch={() => console.log(search)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 2.5 }}>
          {numberItems} Items for Sale
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10, mb: 10 }}>
          
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
           
          }
          
        </Box>
      </Box>
    </Template>
  )
}

export default DefaultFeed
