import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'
import { ItemCard } from '../../components/feed/ItemCard'
import { Template } from '../../components/generic/Template'

const RecommendedFeed: NextPage = () => {
  return (
    <Template title='Swapr'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          Recommended Feed
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '90vw' }}>
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </Box>
      </Box>
    </Template>
  )
}

export default RecommendedFeed
