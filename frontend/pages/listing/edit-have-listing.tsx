import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Card, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useRouter } from "next/router";
import { ListingProps } from "../../components/listing/types";

/////////////////////////////////////////////////////////////////////////////
// Data Types
/////////////////////////////////////////////////////////////////////////////

const mockData: ListingProps = {
  title: "Used Kayak",
  image: 'https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  description: "Random Description for Kayak",
  location: "Kensington NSW",
  categories: ['Entertainment', 'Vehicles'],
  status: "available",
  trade: true,
  cash: true,
  bank: false,
  weight: 100, 
  volume: 0,
  material: ['wood', 'metal'],
  tradeCategories: ['Vehicles'],
  price: 1273
}

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const EditHaveListing: NextPage = () => {

  const data = mockData;

  return (
    <Template title="Edit Have Listing">
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40 }}>

        {/** Left Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Card variant="outlined" sx={{ height: 280, width: 400, borderRadius: 4 }}>
            {
              data.image
                ? <img src={data.image} alt='profile' style={{ height: 280, width: 400 }} />
                : <></>
            }
          </Card>
          <Typography sx={{ p: 3, pl: 4, fontSize: 20, fontWeight: 'bold' }}>{data.title}</Typography>
        </Box>

        {/** Right Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
          <Box sx={{ display: 'flex', mt: 1.5, width: '100%' }}>
            <Button variant="outlined" sx={{ borderRadius: 30, mr: 0.5, width: '50%', height: 45 }}>
              Message User
            </Button>
            <Button variant="outlined" sx={{ borderRadius: 30, ml: 0.5, width: '50%', height: 45 }}>
              View Trader Profile
            </Button>
          </Box>
        </Box>

      </Box >
    </Template>
  );
};

export default EditHaveListing
