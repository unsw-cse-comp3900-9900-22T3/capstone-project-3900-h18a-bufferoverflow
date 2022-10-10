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

  const image = ''

  return (
    <Template title="Have Listing" center>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40 }}>

        {/** Item Image Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Card variant="outlined" sx={{ height: 280, width: 400, borderRadius: 4 }}>
            {
              image
                ? <img src={image} alt='profile' style={{ height: 300, width: 300 }} />
                : <></>
            }
          </Card>
          <Typography sx={{ p: 3, pl: 4, fontSize: 20, fontWeight: 'bold' }}>Item Name</Typography>
        </Box>

        {/** Information Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 450 }}>
          <LabelBox title="Location">
            <Typography>
              The University of New South Wales High St Kensington NSW 2033
            </Typography>
          </LabelBox>
          <LabelBox title="Categories">

          </LabelBox>
          <LabelBox title="Description">
            <Typography>
              Location askdjfh lkasjdfh lksajdhf lkajsdh flkjsdh fljkash fljkahsd
              lfjksahd lfjkhsa kfjh lsadkjf hl lsjdf hklsaj hflkjsadh flkajsh f
            </Typography>
          </LabelBox>
          <Button variant="outlined" sx={{ borderRadius: 30, mt: 4, height: 40 }} onClick={() => { }}>
            Propose Trade
          </Button>
          <Box sx={{ display: 'flex', mt: 1.5, width: 450 }}>
            <Button variant="outlined" sx={{ borderRadius: 30, mr: 0.5, width: '50%', height: 40 }} onClick={() => { }}>
              Message User
            </Button>
            <Button variant="outlined" sx={{ borderRadius: 30, ml: 0.5, width: '50%', height: 40 }} onClick={() => { }}>
              View Trader Profile
            </Button>
          </Box>
        </Box>

      </Box>
    </Template>
  );
};

export default DetailedHaveListing