import { Box, Button, Card, TextField } from "@mui/material"
import { useState } from "react"
import { Template } from "../components/Template"

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <Template title="Login">
      <Box sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Card
          variant="outlined"
          sx={{
            width: 450,
            minHeight: 300,
            padding: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: 1 }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type='password'
            sx={{ marginBottom: 1 }}
          />
          <Button variant="outlined">Outlined</Button>
        </Card>
      </Box>
    </Template >
  )
}

export default Login