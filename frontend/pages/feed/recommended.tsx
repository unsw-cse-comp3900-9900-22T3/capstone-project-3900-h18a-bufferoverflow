import { Box } from '@mui/material'
import { NextPage } from 'next'
import { ItemCard } from '../../components/feed/ItemCard'
import { Template } from '../../components/generic/Template'

const RecommendedFeed: NextPage = () => {
  return (
    <Template title='Swapr'>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
    </Template>
  )
}

export default RecommendedFeed
