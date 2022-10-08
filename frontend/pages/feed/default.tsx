import { Template } from '../../components/generic/Template'
import { NextPage } from 'next'
import ItemCards from '../../components/feed/ItemCards'

const DefaultFeed: NextPage = () => {
  return (
    <Template title='Swapr'>
      <ItemCards />
    </Template>
  )
}

export default DefaultFeed
