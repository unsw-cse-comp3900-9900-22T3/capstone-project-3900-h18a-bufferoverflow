import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { ItemCard } from '../../components/feed/ItemCard'
import { Box, Button } from '@mui/material'

const Landing: NextPage = () => {
  return (
    <Template title='Swapr'>
      <Box>
        <h1>Welcome to Swapr</h1>
        <h2>Swapr is a platform for selling or swapping secondhand items</h2>
        <Button href='/feed/default'>Check it out here </Button>
      </Box>
    </Template>
  )
}

export default Landing
