import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Template } from '../components/Template'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Template title='Swapr'>
      saklf hsalkjfh lksadjfh
      <Button href='/test/request'>GO TO TEST PAGE</Button>
      <Button href='/test/upload'>GO TO UPLOAD</Button>
    </Template>
  )
}

export default Home
