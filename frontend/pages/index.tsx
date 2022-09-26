import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Template } from '../components/Template'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Template title='Home'>
      saklf hsalkjfh lksadjfh
      <Button onClick={() => router.push('/test')}>
        GO TO TEST PAGE
      </Button>
    </Template>
  )
}

export default Home
