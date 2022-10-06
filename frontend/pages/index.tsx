import { Button } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Template } from '../components/generic/Template'
import DefaultFeed from '../components/feed/default'
import { useStore } from '../store/store'
import RecommendedFeed from '../components/feed/recommended'

const Home: NextPage = () => {
  const auth = useStore()
  const router = useRouter()
  return <Template title='Swapr'>{auth ? <RecommendedFeed /> : <DefaultFeed />}</Template>
}

export default Home
