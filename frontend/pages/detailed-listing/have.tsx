import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Card, Typography } from "@mui/material";

/////////////////////////////////////////////////////////////////////////////
// Data Types
/////////////////////////////////////////////////////////////////////////////

// We should define the structure of the response from API as a type @frontend team

interface HaveListingProps {
  location: string;
  title: string;
  image: string
  categories: string[];
  description: string;
  trader: string;
  avatar: string;
  cash: boolean;
  trade: boolean;
  bank: boolean;
  price: boolean;
}

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const LabelBox = (props: {
  title: string;
  children?: JSX.Element | JSX.Element[];
}) => {
  return (
    <Box sx={{ mb: 2, display: 'flex' }}>
      <Box sx={{ width: 350 }}>
        <Typography sx={{ fontWeight: 'bold' }}>{props.title}</Typography>
      </Box>
      <Box sx={{ width: 600 }}>
        {props.children}
      </Box>
    </Box>
  )
}

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DetailedHaveListing: NextPage = () => {

  const image = 'https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  const categories = [
    "asdfsadf",
    "asdfdf",
    "asdfsa",
    "asdfsa",
    "asdfsa",
  ]
  const trader = 'sean'

  return (
    <Template title="Have Listing" center>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40 }}>

        {/** Item Image Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Card variant="outlined" sx={{ height: 280, width: 400, borderRadius: 4 }}>
            {
              image
                ? <img src={image} alt='profile' style={{ height: 280, width: 400 }} />
                : <></>
            }
          </Card>
          <Typography sx={{ p: 3, pl: 4, fontSize: 20, fontWeight: 'bold' }}>Item Name</Typography>
        </Box>

        {/** Information Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
          <LabelBox title="Location">
            <Typography fontSize={16} variant="body2">
              The University of New South Wales High St Kensington NSW 2033
            </Typography>
          </LabelBox>
          <LabelBox title="Categories">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
              {
                categories.map(category => (
                  <Box sx={{ border: 1, width: 140, p: 1, borderRadius: 10, m: 0.5, textAlign: 'center', color: '#616161' }}>
                    {category}
                  </Box>
                ))
              }
            </Box>
          </LabelBox>
          <LabelBox title="Description">
            <Typography fontSize={16} variant="body2">
              Location askdjfh lkasjdfh lksajdhf lkajsdh flkjsdh fljkash fljkahsd
              lfjksahd lfjkhsa kfjh lsadkjf hl lsjdf hklsaj hflkjsadh flkajsh f
            </Typography>
          </LabelBox>
          <Button variant="outlined" sx={{ borderRadius: 30, mt: 4, height: 45 }} href={`/trade/propose?user=${trader}`}>
            Propose Trade
          </Button>
          <Box sx={{ display: 'flex', mt: 1.5, width: '100%' }}>
            <Button variant="outlined" sx={{ borderRadius: 30, mr: 0.5, width: '50%', height: 45 }} href={`/chat/chat?user=${trader}`}>
              Message User
            </Button>
            <Button variant="outlined" sx={{ borderRadius: 30, ml: 0.5, width: '50%', height: 45 }} href={`/profile/visitor-profile?user=${trader}`}>
              View Trader Profile
            </Button>
          </Box>
        </Box>

      </Box>
    </Template>
  );
};

export default DetailedHaveListing