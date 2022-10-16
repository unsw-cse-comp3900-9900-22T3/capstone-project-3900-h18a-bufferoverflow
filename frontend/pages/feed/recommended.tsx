import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { ItemCard, ItemCardProps } from '../../components/feed/ItemCard'
import { SearchBar, SearchBarProps } from '../../components/feed/SearchBar';
import { Template } from '../../components/generic/Template'
import { mockRequest } from '../../utils/mockdata';

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const RecommendedFeed: NextPage = () => {

  const [data, setData] = useState<ItemCardProps[]>([])
  const [search, setSearch] = useState<SearchBarProps>({
    categories: [],
    price: {
      max: 1000000,
      min: 0
    },
    listing: 'have',
    distance: 1000000
  })

  useEffect(() => {
    mockRequest()
      .then(data => setData(data))
  }, [])

  return (
    <Template title='Swapr'>
      <SearchBar data={search} setData={setSearch} onSearch={() => console.log(search)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 2.5 }}>
          Recommended Feed
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', justifyContent: 'center' }}>
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
