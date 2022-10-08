import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Template } from '../components/generic/Template'
import { useStore } from '../store/store'
import RecommendedFeed from '../components/feed/recommended'
import { Landing } from '../components/landing/Landing'

const Home: NextPage = () => {
  const auth = useStore()
  const [loggedIn, setLoggedIn] = useStore(auth)

  const router = useRouter()
  return <Template title='Swapr'>{auth ? <RecommendedFeed /> : <Landing />}</Template>
}

export default Home
