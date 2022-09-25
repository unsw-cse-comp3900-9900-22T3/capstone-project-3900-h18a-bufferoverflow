import { AuthCard } from '../components/AuthCard'
import { Template } from '../components/Template'
import { Button, TextField } from '@mui/material'
import loginTextFieldStyles from '../styles/style'
import { useState } from 'react'

const title = 'Reset Password'

export const ResetPassword = () => {
  const [email, setEmail] = useState<string>('')

  return (
    <Template title={title}>
      <AuthCard title={title}>
        <TextField
          id='outlined-basic'
          value={email}
          onChange={(change) => setEmail(change.target.value)}
          label='Email'
          variant='outlined'
          sx={loginTextFieldStyles}
        />
        <Button variant='outlined' sx={{ width: 270, mb: 2, mt: 2 }}>
          Reset
        </Button>
      </AuthCard>
    </Template>
  )
}

export default ResetPassword
