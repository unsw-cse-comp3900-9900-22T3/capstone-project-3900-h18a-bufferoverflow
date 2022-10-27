import { DocumentNode, gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Divider, TextField } from "@mui/material"
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { AuthCard } from "../../components/auth/AuthCard"
import { Template } from "../../components/generic/Template"
import { Toast } from "../../components/generic/Toast"
import { useStoreUpdate } from "../../store/store"
import { convertUserToAuthProps } from "../../store/utils"
import loginTextFieldStyles from "../../styles/style"
import { parseFirebaseError } from "../../utils/utils"

/////////////////////////////////////////////////////////////////////////////
// Query
/////////////////////////////////////////////////////////////////////////////

const REGISTER_QUERY = gql`
  mutation Register($email: String!, $username: String!) {
    createUser(
      email: $email
      username: $username
    ) {
      success
      errors
      user {
        email
        username
      }
    }
  }
`

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

export const Register = () => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorToast, setErrorToast] = useState<string>('');

  const [register, _] = useMutation(REGISTER_QUERY)
  const router = useRouter();
  const setStore = useStoreUpdate()

  return (
    <Template title="Register">
      <Box sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AuthCard title="Register">
          <Toast toast={errorToast} setToast={setErrorToast} type='warning' />
          <TextField
            id='outlined-basic'
            value={username}
            onChange={change => setUsername(change.target.value)}
            label="Username"
            variant="outlined"
            sx={loginTextFieldStyles}>
          </TextField>
          <TextField
            id='outlined-basic'
            value={email}
            onChange={change => setEmail(change.target.value)}
            label="Email"
            variant="outlined"
            sx={loginTextFieldStyles}
          />
          <TextField
            value={password}
            onChange={(change) => setPassword(change.target.value)}
            id='outlined-basic'
            label='Password'
            variant='outlined'
            type='password'
            sx={loginTextFieldStyles}
          />
          <Button
            variant="outlined"
            sx={{ width: 280, mb: 2, mt: 2 }}
            onClick={async () => {
              if (password.length < 6) {
                setErrorToast('Password must be greater than 6 characters')
                return
              }
              let { data } = await register({ variables: { email, username } })
              if (!data.createUser.success) {
                const error = data.createUser.errors
                if (error.toString().includes('Key (email)')) setErrorToast('Email is already taken')
                else if (error.toString().includes('Key (username)')) setErrorToast('Username is already taken')
                else setErrorToast(`Server error ${error}`)
                return
              }
              await createUserWithEmailAndPassword(getAuth(), email, password)
                .then(async (res) => {
                  await updateProfile(res.user, { displayName: username })
                  setStore({ auth: await convertUserToAuthProps(res.user) })
                })
                .catch(err => {
                  setErrorToast('Error: ' + parseFirebaseError(err.code))
                })
            }}
          >
            Sign up
          </Button>
          <Divider sx={{ mb: 3.5, mt: 2, width: 220 }} />
          <Box sx={{

          }}>
            <Button
              variant="outlined"
              sx={{ width: 100, mr: 1 }}
              href="/auth/login"
            >
              Login
            </Button>
            <Button variant='outlined' sx={{ width: 170 }} href='/auth/reset-password'>
              Reset Password
            </Button>
          </Box>
        </AuthCard>
      </Box>
    </Template>
  )
}

export default Register
