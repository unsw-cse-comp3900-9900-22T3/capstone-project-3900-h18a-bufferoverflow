import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard, ItemCardProps } from '../../components/feed/ItemCard'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

/////////////////////////////////////////////////////////////////////////////
// Data Types
/////////////////////////////////////////////////////////////////////////////

// This is a function that mimics a post request - returns data after 2 seconds delay
const fakePostRequest = async (): Promise<ItemCardProps[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return [
    {
      title: 'Used Kayak',
      price: 9999,
      location: 'Kensingston, NSW',
      image:
        'https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      avatar: 'https://mui.com/static/images/avatar/3.jpg',
      want: true
    }
  ]
}

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DefaultFeed: NextPage = () => {

  const [data, setData] = useState<ItemCardProps[]>([])

  // Pre-fill data once POST request is complete
  useEffect(() => {
    fakePostRequest()
      .then(data => setData(data))
  }, [])

  return (
    <Template title='Swapr'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          {data ? data.length : 0} Items for Sale
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
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

export default DefaultFeed
