import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField/TextField'
import { Button } from '@mui/material'

// To preview, visit http://localhost:3000/profile/user-profile

const UserProfile: NextPage = () => {
  return (
    <Template title='User Profile' center>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '60px',
        }}
      >
        <Box sx={{ backgroundColor: 'blue' }}>left side</Box>
        <Box sx={{ backgroundColor: 'green', display: 'flex', flexDirection: 'column' }}>
          Public Information
          <TextField id='outlined-basic' label='Username' variant='outlined' />
          <TextField id='outlined-basic' label='Community' variant='outlined' />
          Private Information
          <TextField placeholder='Bio' multiline rows={4} maxRows={6} />
          <TextField placeholder='Address' multiline rows={4} maxRows={6} />
          <Button>Update Profile</Button>
        </Box>
        <Box sx={{ backgroundColor: 'grey' }}>direct to My Listings</Box>
      </Box>
    </Template>
  )
}

export default UserProfile