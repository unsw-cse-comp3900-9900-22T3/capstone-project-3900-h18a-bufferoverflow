import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Box, Button, Card, Checkbox, createTheme, FormControl, FormControlLabel, FormGroup, FormLabel, Tab, Tabs, TextField, Typography } from "@mui/material";
import { createRef, useState } from "react";
import { ItemStatsType, StatusType } from "../../components/listing/types";
import { uploadFile } from "../../utils/imageUtils";
import { CategorySearch } from "../../components/feed/CategorySearch";

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const Slider = (props: {
  status: StatusType;
  setStatus: (arg: StatusType) => void;
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, ml: 0.5 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 'bold', mr: 3, mt: 0.9 }}>Status</Typography>
      <Tabs
        value={props.status}
        onChange={(_, val) => props.setStatus(val)}
        textColor='secondary'
        indicatorColor="secondary"
        sx={{ mt: 1.5 }}
      >
        <Tab label="available" value={'available'} />
        <Tab label="pending" value={'pending'} />
      </Tabs>
    </Box>
  )
}

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
  const [trade, setTrade] = useState<boolean>(false)
  const [cash, setCash] = useState<boolean>(false)
  const [bank, setBank] = useState<boolean>(false)
  const [tradeDescription, setTradeDescription] = useState<string>('')
  const [stats, setStats] = useState<ItemStatsType>({ type: 'weight', value: 0 })
  const [materials, setMaterials] = useState<string[]>([])
  const [tradeCategories, setTradeCategories] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)

  return (
    <Template title="Create Have Listing" center>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 40 }}>

        {/** Left Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', mb: 2 }}>Item Information</Typography>
          <TextField value={title} label="Title" variant="outlined" sx={{ mb: 1 }} onChange={e => setTitle(e.target.value)} />
          <Card variant="outlined" sx={{ height: 280, width: 450, borderRadius: 4 }}>
            {
              image
                ? <img src={image} alt='profile' style={{ height: '100%', width: '100%' }} />
                : <></>
            }
          </Card>
          <Button component="label" sx={{ mb: 1, mt: 1 }}>
            Select Photo
            <input id='bob' ref={ref} type="file" hidden accept='image/png, image/jpeg' onChange={async () => {
              if (ref.current.files[0]) setImage(await uploadFile(ref.current.files[0]))
            }} />
          </Button>
          <TextField value={description} label="Description" variant="outlined" sx={{ mb: 1.5 }} multiline rows={3} onChange={e => setDescription(e.target.value)} />
          <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5, ml: 0.5 }}>Location</Typography>
          <TextField value={location} label="Location" variant="outlined" sx={{ mb: 1.5 }} onChange={e => setLocation(e.target.value)} />
          <CategorySearch
            setCategories={setCategories}
            validCategories={['Entertainment', 'Vehicles']}
            title="Category"
            width={450}
          />
          <Slider status={status} setStatus={setStatus} />
        </Box>

        {/** Right Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 450 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 2 }}>What I'm Looking For In Return</Typography>
          <Typography sx={{ fontSize: 16, mb: 0.5, ml: 0.5 }}>Accepted Trade / Payment Methods</Typography>
          <FormControl sx={{ m: 0.5 }} component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={trade} onChange={() => setTrade(!trade)} />}
                label="Trade for another item"
              />
              <FormControlLabel
                control={<Checkbox checked={cash} onChange={() => setCash(!cash)} />}
                label="Payment in cash"
              />
              <FormControlLabel
                control={<Checkbox checked={bank} onChange={() => setBank(!bank)} />}
                label="Payment by bank transfer or payment service"
              />
            </FormGroup>
          </FormControl>
          <TextField value={tradeDescription} label="What I want as a trade" variant="outlined" sx={{ mb: 1.5 }} multiline rows={3} onChange={e => setTradeDescription(e.target.value)} />
          <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5, ml: 0.5 }}>Approximate Item Stats</Typography>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <TextField value={stats} label="Weight (kg)" variant="outlined" onChange={e => setStats({ type: 'weight', value: parseInt(e.target.value) })} />
            <Typography sx={{ fontSize: 16 }}>or</Typography>
            <TextField value={stats} type='number' label="Volume (cubic m)" variant="outlined" onChange={e => setStats({ type: 'volume', value: parseInt(e.target.value) })} />
          </Box>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5, ml: 0.5 }}>Materials</Typography>
          <CategorySearch
            setCategories={setMaterials}
            validCategories={['Wood', 'Metal']}
            title="Materials"
            width={'100%'}
          />
          <Button variant="outlined" sx={{ borderRadius: 30, width: '100%', height: 45 }}>
            Post Have Listing
          </Button>
        </Box>

      </Box >
    </Template >
  );
};

export default CreateHaveListing
