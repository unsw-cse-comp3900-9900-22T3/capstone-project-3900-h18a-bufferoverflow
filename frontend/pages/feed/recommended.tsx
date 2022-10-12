import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { ItemCard, ItemCardProps } from '../../components/feed/ItemCard'
import { Template } from '../../components/generic/Template'
import { mockRequest } from '../../utils/mockdata';

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const RecommendedFeed: NextPage = () => {

  const [data, setData] = useState<ItemCardProps[]>([])

  useEffect(() => {
    mockRequest()
      .then(data => setData(data))
  }, [])

  return (
    <Template title='Swapr'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          Recommended Feed
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

export default RecommendedFeed
