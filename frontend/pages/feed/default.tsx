import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard, ItemCardProps } from '../../components/feed/ItemCard'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { mockItemCardRequest } from '../../utils/mockdata'
import { SearchBar, SearchBarProps } from '../../components/feed/SearchBar'
import { MAX_DISTANCE, MAX_PRICE, MIN_PRICE } from '../../utils/globals'

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DefaultFeed: NextPage = () => {

  // const { data } = useQuery<ItemCardProps[]>(GET_FEED);

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

  useEffect(() => {
    mockItemCardRequest()
      .then(data => setData(data))
  }, [])

  return (
    <Template title='Swapr'>
      <SearchBar data={search} setData={setSearch} onSearch={() => console.log(search)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 2.5 }}>
          {data ? data.length : 0} Items for Sale
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw', pl: 10, mb: 10 }}>
          {
            data?.map(item => {
              const href = item.want ? `/detailed-listing/want?title=${item.title}` : `/detailed-listing/have?title=${item.title}`
              return <ItemCard {...item} href={href} />
            })
          }
        </Box>
      </Box>
    </Template>
  )
}

export default DefaultFeed
