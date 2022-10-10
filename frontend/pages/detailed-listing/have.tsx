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
          <Typography sx={{ p: 3, pl: 4, fontWeight: 'bold' }}>Item Name</Typography>
        </Box>

        {/** Information Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          <Typography sx={{ mb: 2 }}>Public Information</Typography>
          <Typography sx={{ mb: 2 }}>Private Information</Typography>
          <Button variant="outlined" sx={{ borderRadius: 30 }} onClick={() => { }}>
            Update Profile
          </Button>
        </Box>

      </Box>
    </Template>
  );
};

export default DetailedHaveListing