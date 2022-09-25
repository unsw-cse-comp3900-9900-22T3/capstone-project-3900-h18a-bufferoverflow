import { Button, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { createRef, useState } from 'react'
import { Template } from '../components/Template'

const Upload: NextPage = () => {
  const ref = createRef<any>()
  const [file, setFile] = useState<File>()
  return (
    <Template title='Upload'>
      <Button component="label">
        Upload File
        <input id='bob' ref={ref} type="file" hidden accept='image/png, image/jpeg' onChange={() => setFile(ref.current.files[0])}/>
      </Button>
      <Typography>Selected File: {file?.name}</Typography>
    </Template>
  )
}

export default Upload
