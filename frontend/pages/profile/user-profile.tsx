import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField/TextField'
import { Avatar, Button, Card, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router'
import { createRef, useState } from 'react'
import { uploadFile } from '../../utils/imageUtils'

/////////////////////////////////////////////////////////////////////////////
// Data Types
/////////////////////////////////////////////////////////////////////////////

// We should define the structure of the response from API as a type @frontend team

interface DataProps {
  image: string;
  username: string;
  community: string;
  bio: string;
  address: string;
}

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const UserProfile: NextPage = () => {

  // Information Hooks
  const [image, setImage] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [community, setCommunity] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  // Utility Hooks
  const ref = createRef<any>()
  const router = useRouter()

  return (
    <Template title='User Profile' center>

      {/** Image Upload Section */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button component="label" sx={{ mb: 2.5 }}>
            Edit Profile Photo
            <input id='bob' ref={ref} type="file" hidden accept='image/png, image/jpeg' onChange={async () => {
              if (ref.current.files[0]) setImage(await uploadFile(ref.current.files[0]))
            }} />
          </Button>
          <Card variant="outlined" sx={{ height: 300, width: 300, borderRadius: 100 }}>
            {
              image
                ? <img src={image} alt='profile' style={{ height: 300, width: 300 }} />
                : <></>
            }
          </Card>
          <Typography sx={{ fontSize: 20, mt: 4, textAlign: 'center' }}>Username</Typography>
        </Box>

        {/** Information Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          <Typography sx={{ mb: 2 }}>Public Information</Typography>
          <TextField id='outlined-basic' label='Username' variant='outlined' sx={{ mb: 1 }} />
          <TextField id='outlined-basic' label='Community' variant='outlined' sx={{ mb: 3 }} />
          <Typography sx={{ mb: 2 }}>Private Information</Typography>
          <TextField placeholder='Bio' multiline rows={4} maxRows={6} sx={{ mb: 1 }} />
          <TextField placeholder='Address' multiline rows={4} maxRows={6} sx={{ mb: 3 }} />
          <Button variant="outlined" sx={{ borderRadius: 30 }}>Update Profile</Button>
        </Box>

        {/** My Listings Redirect Section */}
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

      </Box>
    </Template>
  )
}

export default UserProfile