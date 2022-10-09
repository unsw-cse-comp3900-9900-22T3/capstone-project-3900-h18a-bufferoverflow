import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField/TextField'
import { Avatar, Button, Card, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router'
import { createRef, useEffect, useState } from 'react'
import { uploadFile } from '../../utils/imageUtils'
import axios from 'axios'

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

// This is a function that mimics a post request - returns data after 2 seconds delay
const fakePostRequest = async (): Promise<DataProps> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    image: 'https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    username: 'Random username',
    community: 'Random community',
    bio: 'random bio',
    address: 'random address'
  }
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

  // Pre-fill data once POST request is complete
  useEffect(() => {
    fakePostRequest()
      .then(data => {
        setImage(data.image)
        setUsername(data.username)
        setCommunity(data.community)
        setBio(data.bio)
        setAddress(data.address)
      })
  }, [])

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
          <Typography sx={{ fontSize: 20, mt: 4, textAlign: 'center' }}>{username}</Typography>
        </Box>

        {/** Information Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          <Typography sx={{ mb: 2 }}>Public Information</Typography>
          <TextField id='outlined-basic' label='Username' variant='outlined' sx={{ mb: 1 }} value={username} onChange={e => setUsername(e.target.value)} />
          <TextField id='outlined-basic' label='Community' variant='outlined' sx={{ mb: 3 }} value={community} onChange={e => setCommunity(e.target.value)} />
          <Typography sx={{ mb: 2 }}>Private Information</Typography>
          <TextField placeholder='Bio' multiline rows={4} sx={{ mb: 1 }} value={bio} onChange={e => setBio(e.target.value)} />
          <TextField placeholder='Address' multiline rows={4} sx={{ mb: 3 }} value={address} onChange={e => setAddress(e.target.value)} />
          <Button variant="outlined" sx={{ borderRadius: 30 }} onClick={() => {
            // We need to post request with modified data later
            let data = { image, username, community, bio, address }
            console.log(data)
          }}>
            Update Profile
          </Button>
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