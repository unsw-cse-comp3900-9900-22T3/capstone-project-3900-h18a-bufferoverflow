import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Template } from '../components/Template'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Template title='Home'>
      saklf hsalkjfh lksadjfh
      <Button href='/test'>
        GO TO TEST PAGE
      </Button>
      <Button href='/upload'>
        GO TO UPLOAD
      </Button>
    </Template>
  )
}

export default Home
