import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard } from '../../components/feed/ItemCard'
import { Box, Typography } from '@mui/material'

const DefaultFeed: NextPage = () => {
  return (
    <Template title='Swapr'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '85vw', fontWeight: 'bold', mt: 2, mb: 1 }}>
          4323 Items for Sale
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

export default DefaultFeed
