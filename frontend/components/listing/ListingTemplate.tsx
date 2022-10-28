import { Box, Button, Card, Checkbox, FormControl, FormControlLabel, FormGroup, InputAdornment, Tab, Tabs, TextField, Typography } from "@mui/material";
import { createRef, useEffect, useState } from "react";
import { ListingProps, StatusType } from "../../components/listing/types";
import { CategorySearch } from "../../components/feed/CategorySearch";
import { uploadFile } from "../../utils/utils";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const GET_LISTING = gql`
  query ($id: ID!) {
    getListing(id: $id) {
      listing {
        id
        title
        categories {
          type
        }
        wantToTradeFor {
          type
        }
        materials {
          type
        }
        image
        description
        address
        status
        price
        canTrade
        canPayCash
        canPayBank
        weight
        volume
      }
      errors
      success
    }
  }
`

/////////////////////////////////////////////////////////////////////////////
// Secondary Components and Constants
/////////////////////////////////////////////////////////////////////////////

const HAVE_LISTING_TITLE = 'What I\'m Looking For In Return'
const WANT_LISTING_TITLE = 'What I Have To Trade'

const Slider = (props: {
  status: StatusType;
  setStatus: (arg: StatusType) => void;
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, ml: 0.5 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 'bold', mr: 3, mt: 0.9 }}>
        Status
      </Typography>
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

export const ListingTemplate = (props: {
  data?: ListingProps;
  edit?: boolean;
  have?: boolean;
}) => {

  const validTradeCategories = ['Entertainment', 'Vehicles']
  const validMaterialCategories = ['Wood', 'Metal']

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
  const [weight, setWeight] = useState<number>()
  const [volume, setVolume] = useState<number>()
  const [materials, setMaterials] = useState<string[]>([])
  const [tradeCategories, setTradeCategories] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)

  const router = useRouter()
  const { id } = router.query

  const data = useQuery(GET_LISTING, { variables: { id } }).data?.getListing.listing

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setImage(data.image)
      setDescription(data.description)
      setLocation(data.address)
      setCategories(data.categories.map((item: any) => item.type))
      setStatus(data.status)
      setTrade(data.canTrade)
      setCash(data.canPayCash)
      setBank(data.canPayBank)
      setWeight(data.weight)
      setVolume(data.volume)
      setMaterials(data.materials.map((item: any) => item.type))
      setTradeCategories(data.wantToTradeFor.map((item: any) => item.type))
      setPrice(data.price)
    }
  }, [data])

  return (
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
          categories={categories || undefined}
          setCategories={setCategories}
          validCategories={['Entertainment', 'Vehicles']}
          title="Category"
          width={450}
        />
        {
          props.edit ? <Slider status={status} setStatus={setStatus} /> : <></>
        }
      </Box>

      {/** Right Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 450 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold', mb: 2 }}>{props.have ? HAVE_LISTING_TITLE : WANT_LISTING_TITLE}</Typography>
        <Typography sx={{ fontSize: 16, mb: 0.5, ml: 0.5 }}>Accepted Trade / Payment Methods</Typography>
        <FormControl sx={{ m: 0.5, mb: 1.5 }} component="fieldset" variant="standard">
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
        <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5, ml: 0.5 }}>Approximate Item Stats</Typography>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <TextField value={weight} type='number' label="Weight (kg)" variant="outlined" onChange={e => setWeight(parseInt(e.target.value))} />
          <Typography sx={{ fontSize: 16 }}>or</Typography>
          <TextField value={volume} type='number' label="Volume (cubic m)" variant="outlined" onChange={e => setVolume(parseInt(e.target.value))} />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5, ml: 0.5 }}>Materials</Typography>
        <CategorySearch
          categories={materials || undefined}
          setCategories={setMaterials}
          validCategories={validMaterialCategories}
          title="Materials"
          width={'100%'}
        />
        <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1.5, ml: 0.5, mt: 1.5 }}>Willing To Trade For Categories</Typography>
        <CategorySearch
          categories={tradeCategories || undefined}
          setCategories={setTradeCategories}
          validCategories={validTradeCategories}
          title="Trade Categories"
          width={'100%'}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2.5, mb: 2.5 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold', mr: 2.5, ml: 0.5 }}>Price</Typography>
          <TextField
            value={price}
            type='number'
            label="Price"
            variant="outlined"
            onChange={e => setPrice(parseInt(e.target.value))}
            sx={{ width: '100%' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
          />
        </Box>
        {
          props.edit
            ? <Box sx={{ display: 'flex', mt: 1.5, width: '100%' }}>
              <Button variant="outlined" sx={{ borderRadius: 30, mr: 0.5, width: '50%', height: 45 }}>
                Update {props.have ? 'Have' : 'Want'} Listing
              </Button>
              <Button variant="outlined" sx={{ borderRadius: 30, ml: 0.5, width: '50%', height: 45 }}>
                Delete Listing
              </Button>
            </Box>
            : <Button variant="outlined" sx={{ borderRadius: 30, width: '100%', height: 45 }}>
              Post {props.have ? 'Have' : 'Want'} Listing
            </Button>
        }
      </Box>

    </Box >
  )
}