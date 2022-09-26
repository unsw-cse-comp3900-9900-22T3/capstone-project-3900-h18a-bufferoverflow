
import { Template } from "../components/Template";
import { getAuth } from '@firebase/auth';
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";;
import { NextPage } from "next";
import { useStore } from "../store/store";

const Test: NextPage = () => {
  const [msg, setMsg] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const { auth } = useStore()
  return (
    <Template title="Test Env">
      <TextField id="standard-basic" label="Standard" variant="standard" onChange={e => setUrl(e.target.value)} value={url} />
      <Button onClick={async () => {
        axios({
          method: 'post',
          url: url,
          data: auth
        })
          .then(r => {
            console.log(r)
            setMsg(JSON.stringify(r.config.data))
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

export default Test
