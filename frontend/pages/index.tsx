import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Template } from '../components/generic/Template'
import ItemCard from '../components/ItemCard'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Template title='Swapr'>
      saklf hsalkjfh lksadjfh
      <ItemCard />
      <Button href='/test'>GO TO TEST PAGE</Button>
      <Button href='/upload'>GO TO UPLOAD</Button>
    </Template>
  )
}

export default Home
