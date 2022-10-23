import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { ItemCard, ItemCardProps } from '../../components/feed/ItemCard'
import { SearchBar, SearchBarProps } from '../../components/feed/SearchBar';
import { Template } from '../../components/generic/Template'
import { mockItemCardRequest } from '../../utils/mockdata';
import { MAX_DISTANCE, MAX_PRICE, MIN_PRICE } from '../../utils/globals';
import { useQuery, gql, DocumentNode } from "@apollo/client"
import { graphql } from "../../gql/gql"
import type {ListingResult} from "../../gql/graphql"

/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

interface FeedGraphqlProps {
  listListings: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: any | null;
  };
}
const GET_LISTINGS = gql`
  query {
    listListings {
      listings {
        isSellListing
        title
        description
        user {
          displayImg
        }
        price
        address
        image  
      }
    }

  `




/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const RecommendedFeed: NextPage = () => {


  const {data} = useQuery<FeedGraphqlProps>(GET_LISTINGS);
  const [dataR, setData] = useState<ItemCardProps[]>([])
  const [search, setSearch] = useState<SearchBarProps>({
    categories: [],
    price: {
      max: MAX_PRICE,
      min: MIN_PRICE,
    },
    listing: 'have',
    distance: MAX_DISTANCE
  })

  useEffect(() => {
    console.log(data);
      mockItemCardRequest()
      .then(data => setData(data))
  }, [data])

  return (
    <Template title='Swapr'>
      <SearchBar data={search} setData={setSearch} onSearch={() => console.log(search)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 2.5 }}>
          Recommended Feed
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10, mb: 10 }}>
          {
            dataR.map(item => {
              const href = item.isSellListing ? '/detailed-listing/have' : '/detailed-listing/want'
              return <ItemCard {...item} href={href} />
            })
          }
        </Box>
      </Box>
    </Template>
  )
}

export default RecommendedFeed
