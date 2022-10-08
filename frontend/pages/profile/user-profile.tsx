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
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const ImageSection = (props: {
  image: string;
  setImage: (arg: string) => void;
}) => {
  const ref = createRef<any>()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button component="label" sx={{ mb: 2.5 }}>
        Edit Profile Photo
        <input id='bob' ref={ref} type="file" hidden accept='image/png, image/jpeg' onChange={async () => {
          if (ref.current.files[0]) {
            console.log("UPLOADING")
            props.setImage('')
            // props.setImage(await uploadFile(ref.current.files[0]))
          }
        }} />
      </Button>
      <Card variant="outlined" sx={{ height: 300, width: 300, borderRadius: 100 }}>
        {
          props.image
            ? <img src={props.image} alt='profile' style={{ height: 300, width: 300 }} />
            : <></>
        }
      </Card>
      <Typography sx={{ fontSize: 20, mt: 4, textAlign: 'center' }}>Username</Typography>
    </Box>
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
          gap: 20,
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