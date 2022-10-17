import { SingleChatOverviewProps } from "../components/chat/single-chat";
import { ItemCardProps } from "../components/feed/ItemCard";

// This is a function that mimics a post request - returns data after 1 seconds delay
export const mockItemCardRequest = async (): Promise<ItemCardProps[]> => {
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

// This is a function that mimics a post request - returns data after 1 seconds delay
export const mockSingleChatRequest = async (): Promise<SingleChatOverviewProps[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  let data = []
  for (let i = 0; i < 4; i++) {
    data.push(structuredClone({
      // TODO: fix href to be dynamic to be between the logged in user and the other user, here as 'John Doe'
      href: '/chat/yourusername-theirusername',
      delHref: '/chat/del/yourusername-theirusername',
      username: 'John Doe',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      lastMessageTime: '2 hours ago',
    }))
  }
  return data
}
