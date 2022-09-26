
import { Template } from "../components/Template";
import { getAuth } from '@firebase/auth';
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";;

export const Test = () => {
  const [msg, setMsg] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  return (
    <Template title="Test Env">
      <TextField id="standard-basic" label="Standard" variant="standard" onChange={e => setUrl(e.target.value)} value={url} />
      <Button onClick={async () => {
        const auth = getAuth()
        axios({
          method: 'post',
          url: url,
          data: {
            idToken: await auth?.currentUser?.getIdToken(),
            email: auth?.currentUser?.email,
            username: auth?.currentUser?.displayName,
            uid: auth?.currentUser?.uid,
            refreshToken: auth?.currentUser?.refreshToken
          }
        })
          .then(r => {
            console.log(r)
            setMsg(JSON.stringify(r))
          })
          .catch(r => {
            console.log(r)
            setMsg(JSON.stringify(r))
          })
        setUrl('')
      }}>
        POST REQUEST
      </Button>
      <Typography>
        {msg}
      </Typography>
    </Template>
  );
};
