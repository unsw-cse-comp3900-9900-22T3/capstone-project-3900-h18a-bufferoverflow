import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { createRef, useState } from "react";
import { ItemStatsType, StatusType } from "../../components/listing/types";
import { uploadFile } from "../../utils/imageUtils";

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

const CreateHaveListing: NextPage = () => {

  const ref = createRef<any>()

  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  const [status, setStatus] = useState<StatusType>('available')
  const [trade, setTrade] = useState<boolean>(true)
  const [cash, setCash] = useState<boolean>(true)
  const [bank, setBank] = useState<boolean>(true)
  const [stats, setStats] = useState<ItemStatsType>('weight')
  const [materials, setMaterials] = useState<string[]>([])
  const [tradeCategories, setTradeCategories] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)

  return (
    <Template title="Create Have Listing" center>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40 }}>

        {/** Left Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', mb: 2 }}>Item Information</Typography>
          <TextField id="outlined-basic" label="Title" variant="outlined" sx={{ mb: 1 }} />
          <Card variant="outlined" sx={{ height: 240, width: 400, borderRadius: 4 }}>
            {
              image
                ? <img src={image} alt='profile' style={{ height: 280, width: 400 }} />
                : <></>
            }
          </Card>
          <Button component="label" sx={{ mb: 1, mt: 1 }}>
            Select Photo
            <input id='bob' ref={ref} type="file" hidden accept='image/png, image/jpeg' onChange={async () => {
              if (ref.current.files[0]) setImage(await uploadFile(ref.current.files[0]))
            }} />
          </Button>
          <TextField id="outlined-basic" label="Description" variant="outlined" sx={{ mb: 1.5 }} multiline rows={3}/>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5 }}>Location</Typography>
          <TextField id="outlined-basic" label="Location" variant="outlined" sx={{ mb: 1 }} />
          {/** ADD CATEGORY SEARCH HERE */}
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
