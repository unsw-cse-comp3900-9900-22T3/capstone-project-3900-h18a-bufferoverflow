import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard } from '../../components/feed/ItemCard'
import { Box, Button } from '@mui/material'

const Landing: NextPage = () => {
  return (
    <Template title='Swapr'>
      <Box id="landing-box">
        <Box>
          <h1>Welcome to Swapr</h1>
          <p>A platform for trading secondhand items</p>
          <p>Create listings for something you have - or something you're looking for!</p>
          <Button href='/feed/default' variant="outlined">Check it out here</Button>
        </Box>
      </Box>
    </Template>
  )
}

export default Landing
