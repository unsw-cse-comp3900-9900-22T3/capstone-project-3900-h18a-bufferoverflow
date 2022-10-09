import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard } from '../../components/feed/ItemCard'
import { Box } from '@mui/material'

const DefaultFeed: NextPage = () => {
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

export default DefaultFeed
