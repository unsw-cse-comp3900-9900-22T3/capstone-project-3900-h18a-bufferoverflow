import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Avatar, Box, Button, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from "next/router";
import { useState } from "react";

/////////////////////////////////////////////////////////////////////////////
// Mock Data
/////////////////////////////////////////////////////////////////////////////

interface FollowingTraderProps {
  avatar: string;
  name: string;
  email: string;
  href: string;
}

const mockData: FollowingTraderProps[] = [
  {
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    name: 'Bobby',
    email: 'bobby1@gmail.com',
    href: '/trade/offer'
  },
  {
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    name: 'Robby',
    email: 'bobby2@gmail.com',
    href: '/trade/offer'
  },
  {
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    name: 'Hobby',
    email: 'bobby3@gmail.com',
    href: '/trade/offer'
  }
]

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const FollowingTraders: NextPage = () => {

  const router = useRouter()
  const [data, setData] = useState<FollowingTraderProps[]>(mockData)

  return (
    <Template title="Following Traders">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ width: '80vw', fontWeight: 'bold', mt: 3.5, mb: 1.5 }}>
          Following Traders
        </Typography>
        {
          data.map(offer => (
            <Box sx={{ width: '80vw', border: 0.5, display: 'flex', borderRadius: 2, justifyContent: 'space-between', mb: 1 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}
                onClick={() => router.push(`/profile/visitor-profile?email=${offer.email}`)}
              >
                <Avatar src={offer.avatar} sx={{ m: 1.5, ml: 3, mr: 3 }} />
                <Typography>{offer.name}</Typography>
              </Box>
              <Button
                sx={{ display: 'flex', zIndex: 10000 }}
                onClick={async () => {
                  // Should query api to update the unfollow action then if successfuly, continue with
                  // rendering the change
                  const index = data.findIndex(x => x.email === offer.email)
                  data.splice(index, 1)
                  setData([...data])
                }}
              >
                <ClearIcon />
              </Button>
            </Box>
          ))
        }
      </Box>
    </Template>
  );
};

export default FollowingTraders
