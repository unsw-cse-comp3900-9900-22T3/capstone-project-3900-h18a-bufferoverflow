import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard, ItemCardProps } from '../../components/feed/ItemCard'
import { Box, Typography } from '@mui/material'
import { gql, useQuery } from '@apollo/client'

/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

const GET_FEED = gql`
  query ExampleQuery {
    locations {
      id
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DefaultFeed: NextPage = () => {

  const { data } = useQuery<ItemCardProps[]>(GET_FEED);

  return (
    <Template title='Swapr'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          4323 Items for Sale
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
          {
            data?.map(item => {
              const href = item.want ? '/detailed-listing/want' : '/detailed-listing/have'
              return <ItemCard {...item} href={href} />
            })
          }
        </Box>
      </Box>
    </Template>
  )
}

export default DefaultFeed
