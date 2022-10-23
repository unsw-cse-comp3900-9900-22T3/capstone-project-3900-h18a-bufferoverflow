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
import type {Listing} from "../../gql/graphql"

/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

interface FeedGraphqlProps {
  listListings: {
    success: boolean | null;
    erorrs: string[] | null;
    listings: Listing[] | null;
  };
}
const GET_LISTINGS = graphql(
  `
    query {
      listListings {
        listings {
          isSellListing
          title
          description
          user {
            displayImg
          }
          priceMin
          priceMax
          address {
            place
          }
          images {
            id
          }
        }
      }
    }
  `
);

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const RecommendedFeed: NextPage = () => {


  const listings = useQuery<FeedGraphqlProps>(GET_LISTINGS.);
  const [data, setData] = useState<ItemCardProps[]>([])
  const [search, setSearch] = useState<SearchBarProps>({
    categories: [],
    price: {
      max: MAX_PRICE,
      min: MIN_PRICE,
    },
    listing: 'have',
    distance: MAX_DISTANCE
  })

  useEffect((data) => {
    // setData(data)
  }, [])

  return (
    <Template title='Swapr'>
      <SearchBar data={search} setData={setSearch} onSearch={() => console.log(search)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 2.5 }}>
          Recommended Feed
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10, mb: 10 }}>
          {
            data.map(item => {
              const href = item.want ? '/detailed-listing/want' : '/detailed-listing/have'
              return <ItemCard {...item} href={href} />
            })
          }
        </Box>
      </Box>
    </Template>
  )
}

export default RecommendedFeed
