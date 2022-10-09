import { BlobServiceClient } from '@azure/storage-blob'
import { Button, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { createRef, useState } from 'react'
import { Template } from '../../components/generic/Template'
import { uploadFile } from '../../utils/imageUtils'

const Upload: NextPage = () => {
  const ref = createRef<any>()
  const [file, setFile] = useState<File>()
  const [imageURL, setImageURL] = useState<string>('')
  return (
    <Template title='Upload'>
      <Button component="label">
        Select File
        <input id='bob' ref={ref} type="file" hidden accept='image/png, image/jpeg' onChange={() => setFile(ref.current.files[0])} />
      </Button>
      <Typography>Selected File: {file?.name}</Typography>
      <Button onClick={async () => {
        if (file) {
          setImageURL(await uploadFile(file))
        }
        setFile(undefined)
      }}>
        Upload
      </Button>
      <Typography>Image URL: {imageURL}</Typography>
      <Typography>Example image from url (1:1 ratio)</Typography>
      {
        imageURL
          ? <img src={imageURL} alt='test' />
          : <></>
      }
    </Template>
  )
}

export default Upload
