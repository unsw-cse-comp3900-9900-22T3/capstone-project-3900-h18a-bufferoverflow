import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Card, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useRouter } from "next/router";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const CreateHaveListing: NextPage = () => {

  return (
    <Template title="Create Have Listing" center>
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
    </Template >
  );
};

export default CreateHaveListing
