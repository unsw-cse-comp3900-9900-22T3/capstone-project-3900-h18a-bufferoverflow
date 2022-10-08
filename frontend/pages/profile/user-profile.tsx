import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField/TextField'
import { Avatar, Button, Card, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router'
import { useState } from 'react'

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const ImageSection = (props: {
  image: string;
  setImage: (arg: string) => void;
}) => {
  return (
    <>
      <Card variant="outlined" sx={{ height: 300, width: 300, borderRadius: 100 }}>
        {
          props.image
            ? <img src={props.image} alt='profile' style={{ height: 300, width: 300 }} />
            : <></>
        }
      </Card>
    </>
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
  const [image, setImage] = useState<string>('https://comp3900storage.blob.core.windows.net/files/Screen%20Shot%202022-09-23%20at%209.22.46%20pm.png?sv=2021-06-08&ss=bf&srt=sco&sp=rwdlaciytfx&se=2022-12-01T09:33:16Z&st=2022-09-25T02:33:16Z&spr=https&sig=uni0ZKrnnzcEsYL%2BF9Skp%2F%2B3MZmxeko1GZmM87NlA2w%3D')
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
        <ImageSection image={image} setImage={setImage} />
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