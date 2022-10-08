import type { NextPage } from 'next'
import { Template } from '../components/generic/Template'
import { useStore } from '../store/store'
import { Landing } from '../components/landing/Landing'
import RecommendedFeed from '../components/feed/recommended'

const Home: NextPage = () => {
  const auth = useStore()
  return <Template title='Swapr'> {auth ? <RecommendedFeed /> : <Landing />}</Template> 
}

export default Home
