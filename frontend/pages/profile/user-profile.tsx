import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField/TextField'
import { Avatar, Button, Card, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router'
import { createRef, useEffect, useState } from 'react'
import { uploadFile } from '../../utils/utils'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useStore, useStoreUpdate } from '../../store/store'
import { Toast } from '../../components/generic/Toast'
import { getAuth, updateProfile } from 'firebase/auth'
import { convertUserToAuthProps } from '../../store/utils'

/////////////////////////////////////////////////////////////////////////////
// Data Types
/////////////////////////////////////////////////////////////////////////////

// We should define the structure of the response from API as a type @frontend team

interface ProfileGraphqlProps {
  getUser: {
    success: boolean | null;
    errors: string[] | null;
    user: {
      displayImg: string;
      username: string;
      community: string;
      bio: string;
      address: string;
    } | null;
  }
}

const GET_USER_QUERY = gql`
  query getUserQuery($email: String!) {
    getUser(email: $email) {
      errors
      success
      user {
        displayImg
        username
        email
        bio
      }
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation updateUserQuery(
    $email: String!
    $username: String
    $bio: String
    $displayImg: String
  ) {
    updateUser(
      username: $username
      bio: $bio
      displayImg: $displayImg
      email: $email
    ) {
      errors
      success
    }
  }
`

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
  const [errorToast, setErrorToast] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string>('');

  // Utility Hooks
  const ref = createRef<any>()
  const router = useRouter()
  const { auth } = useStore()
  const setStore = useStoreUpdate()

  // Graphql Query
  const { data } = useQuery<ProfileGraphqlProps>(GET_USER_QUERY, { variables: { email: auth?.email || '' } })
  const [updateUserProfile, _] = useMutation(UPDATE_USER_MUTATION)

  useEffect(() => {
    // Once data is loaded from graphql query, use useState hook to set the state
    if (data?.getUser.user) {
      const user = data.getUser.user
      if (user.displayImg) setImage(user.displayImg)
      if (user.username) setUsername(user.username)
      if (user.community) setCommunity(user.community)
      if (user.bio) setBio(user.bio)
      if (user.address) setAddress(user.address)
    }
  }, [data])

  return (
    <Template title='User Profile' center>
      <Toast toast={errorToast} setToast={setErrorToast} type='warning' />
      <Toast toast={successToast} setToast={setSuccessToast} type='success' />

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
          <Button variant="outlined" sx={{ borderRadius: 30 }} onClick={async () => {
            // We need to post request with modified data later
            let data = { displayImg: image, username, bio, email: auth?.email || '' }
            if (username.length === 0) {
              setErrorToast("Username cannot be empty")
              return
            }
            try {
              const user = getAuth().currentUser!
              let res = await updateUserProfile({ variables: data })
              if (!res.data.updateUser.success) throw 'username is already taken'
              await updateProfile(user, { displayName: username })
              setStore({ auth: await convertUserToAuthProps(user) })
              setSuccessToast("Updated profile successfully!")
            } catch (e) {
              setErrorToast("Error: " + e)
            }
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