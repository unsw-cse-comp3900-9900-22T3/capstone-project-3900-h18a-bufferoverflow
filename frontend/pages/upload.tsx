import { BlobServiceClient } from '@azure/storage-blob'
import { Button, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { createRef, useState } from 'react'
import { Template } from '../components/Template'
import { wrapper } from '../store/store'

const uploadFile = async (file: File) => {
  const service = new BlobServiceClient(
    "https://comp3900storage.blob.core.windows.net/?sv=2021-06-08&ss=bf&srt=sco&sp=rwdlaciytfx&se=2022-12-01T09:33:16Z&st=2022-09-25T02:33:16Z&spr=https&sig=uni0ZKrnnzcEsYL%2BF9Skp%2F%2B3MZmxeko1GZmM87NlA2w%3D"
  )
  // Create container
  const container = service.getContainerClient("files")
  await container.createIfNotExists({ access: 'container' })
  // Create new blob
  const blob = container.getBlockBlobClient(file.name)
  blob.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type } })
  return blob.url
}

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
          ? <Image loader={() => imageURL} src={imageURL} alt='test image' width={200} height={200} />
          : <></>
      }
    </Template>
  )
}

Upload.getInitialProps = wrapper.getInitialPageProps(store => () => {
  console.log('2. Page.getInitialProps uses the store to dispatch things');
});

export default Upload
