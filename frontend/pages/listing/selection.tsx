import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { Avatar, Box, Button, Typography } from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

const Selection: NextPage = () => {
  return (
    <Template title='New Listing Selection' center>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 }}>

        <Button sx={{ border: 1, height: 320, width: 240, display: 'flex', flexDirection: 'column' }}>
          <Avatar sx={{ height: 70, width: 70, color: 'black' }}>
            <LocalGroceryStoreIcon sx={{ height: 40, width: 40 }} />
          </Avatar>
          <Typography sx={{ fontWeight: 'bold', textTransform: 'none', mt: 3 }}>Create a Want Listing</Typography>
          <Typography sx={{ fontSize: 14, textTransform: 'none', mt: 2.5, width: 180, height: 50 }}>
            Create a listing that tells others you want an item
          </Typography>
        </Button>

        <Button sx={{ border: 1, height: 320, width: 240, display: 'flex', flexDirection: 'column' }}>
          <Avatar sx={{ height: 70, width: 70, color: 'black' }}>
            <StoreMallDirectoryIcon sx={{ height: 40, width: 40 }} />
          </Avatar>
          <Typography sx={{ fontWeight: 'bold', textTransform: 'none', mt: 3 }}>Create a Have Listing</Typography>
          <Typography sx={{ fontSize: 14, textTransform: 'none', mt: 2.5, width: 180, height: 50 }}>
            Create a listing that tells others you that you want to trade this item
          </Typography>
        </Button>

      </Box>

    </Template>
  )
}

export default Selection
