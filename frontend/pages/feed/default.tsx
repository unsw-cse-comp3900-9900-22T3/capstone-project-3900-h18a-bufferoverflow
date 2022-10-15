import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard, ItemCardProps } from '../../components/feed/ItemCard'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { mockRequest } from '../../utils/mockdata'
import { SearchBar, SearchBarProps } from '../../components/feed/SearchBar'

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DefaultFeed: NextPage = () => {

  // const { data } = useQuery<ItemCardProps[]>(GET_FEED);

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
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          {data ? data.length : 0} Items for Sale
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
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
