import type { NextPage } from 'next'
import { useStore } from '../store/store'
import Landing from './feed/landing';
import RecommendedFeed from './feed/recommended'

const Home: NextPage = () => {
  const { auth } = useStore();

  return (<>{auth ? <RecommendedFeed /> : <Landing />}</>)
}

export default Home
