import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField/TextField'
import { Avatar, Button, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router'

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const ImageSection = () => {
  return (
    <></>
  )
}

const InputSection = () => {
  return (
    <></>
  )
}

const MyListingsRedirectSection = () => {
  const router = useRouter()
  return (
    <Box
      onClick={() => router.push('/listing/my-listings')}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Avatar>
        <ArrowForwardIcon />
      </Avatar>
      <Typography sx={{ mt: 2 }}>
        View My Listings
      </Typography>
    </Box >
  )
}

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

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
        <Box>left side</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          Public Information
          <TextField id='outlined-basic' label='Username' variant='outlined' />
          <TextField id='outlined-basic' label='Community' variant='outlined' />
          Private Information
          <TextField placeholder='Bio' multiline rows={4} maxRows={6} />
          <TextField placeholder='Address' multiline rows={4} maxRows={6} />
          <Button>Update Profile</Button>
        </Box>
        <MyListingsRedirectSection />
      </Box>
    </Template>
  )
}

export default UserProfile