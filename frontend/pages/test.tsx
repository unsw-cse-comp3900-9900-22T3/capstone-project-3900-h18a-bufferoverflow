
import { Template } from "../components/Template";
import { getAuth } from '@firebase/auth';
import { Button, Typography } from "@mui/material";
import { useState } from "react";

const Test = () => {
  const [msg, setMsg] = useState<string>('');
  return (
    <Template title="Test Env">
      <Button onClick={async () => {
        const auth = getAuth()
        postData('https://httpbin.org/post', { 
          idToken: await auth?.currentUser?.getIdToken(),
          email: auth?.currentUser?.email,
          username: auth?.currentUser?.displayName,
          uid: auth?.currentUser?.uid,
          refreshToken: auth?.currentUser?.refreshToken
        })
          .then((data) => setMsg(data))
          .catch((e) => setMsg(e + ''))
      }}>
        PRESS
      </Button>
      <Typography>
        {msg}
      </Typography>
    </Template>
  );
};

export default Test;

async function postData(url = '', data = {}) {
  console.log(data)
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return JSON.stringify(response)
}