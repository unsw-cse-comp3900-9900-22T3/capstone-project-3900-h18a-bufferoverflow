import { ItemCardProps } from "../components/feed/ItemCard";

// This is a function that mimics a post request - returns data after 1 seconds delay
export const mockRequest = async (): Promise<ItemCardProps[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  let data = []
  for (let i = 0; i < 20; i++) {
    data.push(structuredClone({
      title: 'Used Kayak',
      price: 9999,
      location: 'Kensingston, NSW',
      image: 'https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      avatar: 'https://mui.com/static/images/avatar/3.jpg',
      want: i % 3 === 0
    }))
  }
  return data
}
