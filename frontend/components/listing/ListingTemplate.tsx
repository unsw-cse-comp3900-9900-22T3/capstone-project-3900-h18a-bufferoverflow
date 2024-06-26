import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { createRef, useEffect, useState } from "react";
import { CategorySearch } from "../../components/feed/CategorySearch";
import { AddressSearch } from "../../components/location/AddressSearch";

import { uploadFile } from "../../utils/utils";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Toast } from "../generic/Toast";
import { useStore } from "../../store/store";
import { ListingProps, StatusType } from "../../@types/component.types";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

const CREATE_LISTING = gql`
  mutation (
    $email: String!
    $title: String!
    $description: String!
    $sell: Boolean!
    $price: Float!
    $trade: Boolean!
    $cash: Boolean!
    $bank: Boolean!
    $status: String!
    $categories: [String]!
    $tradeCategories: [String]!
    $weight: Float
    $volume: Float
    $materials: [String]!
    $location: String!
    $image: String!
    $latitude: Float
    $longitude: Float
  ) {
    createListing(
      userEmail: $email
      title: $title
      description: $description
      isSellListing: $sell
      price: $price
      canTrade: $trade
      canPayCash: $cash
      canPayBank: $bank
      status: $status
      categories: $categories
      wantToTradeFor: $tradeCategories
      weight: $weight
      volume: $volume
      materials: $materials
      address: $location
      image: $image
      latitude: $latitude
      longitude: $longitude
    ) {
      errors
      success
    }
  }
`;

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
        latitude
        longitude
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
`;

const UPDATE_LISTING = gql`
  mutation (
    $id: ID!
    $title: String
    $description: String
    $price: Float
    $trade: Boolean
    $cash: Boolean
    $bank: Boolean
    $status: String
    $categories: [String]
    $tradeCategories: [String]
    $weight: Float
    $volume: Float
    $materials: [String]
    $location: String
    $image: String
    $latitude: Float
    $longitude: Float
  ) {
    updateListing(
      id: $id
      title: $title
      description: $description
      price: $price
      canTrade: $trade
      canPayCash: $cash
      canPayBank: $bank
      status: $status
      categories: $categories
      wantToTradeFor: $tradeCategories
      weight: $weight
      volume: $volume
      materials: $materials
      address: $location
      image: $image
      latitude: $latitude
      longitude: $longitude
    ) {
      errors
      success
    }
  }
`;

const DELETE_LISTING = gql`
  mutation ($id: ID!) {
    deleteListing(id: $id) {
      success
    }
  }
`;

const GET_MATERIALS = gql`
  query {
    getMaterials {
      materials
    }
  }
`;

const GET_CATEGORIES = gql`
  query {
    getCategories {
      categories
    }
  }
`;

const GET_USER_ADDRESS = gql`
  query getUserAddressQuery($email: String!) {
    getUser(email: $email) {
      errors
      success
      user {
        address
        latitude
        longitude
      }
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////
// Secondary Components and Constants
/////////////////////////////////////////////////////////////////////////////

const HAVE_LISTING_TITLE = "What I'm Looking For In Return";
const WANT_LISTING_TITLE = "What I Have To Trade";

const Slider = (props: {
  status: StatusType;
  setStatus: (arg: StatusType) => void;
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, ml: 0.5 }}>
      <Typography sx={{ fontSize: 16, fontWeight: "bold", mr: 3, mt: 0.9 }}>
        Status
      </Typography>
      <Tabs
        value={props.status}
        onChange={(_, val) => props.setStatus(val)}
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ mt: 1.5 }}
      >
        <Tab label="available" value={"available"} />
        <Tab label="pending" value={"pending"} />
      </Tabs>
    </Box>
  );
};

/////////////////////////////////////////////////////////////////////////////
// Primary Component
/////////////////////////////////////////////////////////////////////////////

export const ListingTemplate = (props: {
  data?: ListingProps;
  edit?: boolean;
  have?: boolean;
}) => {
  const validTradeCategories =
    useQuery(GET_CATEGORIES).data?.getCategories.categories;
  const validMaterialCategories =
    useQuery(GET_MATERIALS).data?.getMaterials.materials;

  const ref = createRef<any>();
  const { auth } = useStore();
  const [errorToast, setErrorToast] = useState<string>("");
  const [successToast, setSuccessToast] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusType>("available");
  const [trade, setTrade] = useState<boolean>(false);
  const [cash, setCash] = useState<boolean>(false);
  const [bank, setBank] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [materials, setMaterials] = useState<string[]>([]);
  const [tradeCategories, setTradeCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [position, setPosition] = useState<Array<number>>([]);

  const router = useRouter();
  const { id } = router.query;

  const [execQuery, { data }] = useLazyQuery(GET_LISTING);
  const [deleteListing, _1] = useMutation(DELETE_LISTING);
  const [updateListing, _2] = useMutation(UPDATE_LISTING);
  const [createListing, _3] = useMutation(CREATE_LISTING);
  const [getUserAddress, userResults] = useLazyQuery(GET_USER_ADDRESS);
  const [hasSetLocationFromUser, setHasSetLocationFromUser] =
    useState<boolean>(false);

  useEffect(() => {
    if (id) {
      execQuery({ variables: { id } });
    }
    if (data && data?.getListing.listing) {
      setTitle(data.getListing.listing.title);
      setImage(data.getListing.listing.image);
      setDescription(data.getListing.listing.description);
      setLocation(data.getListing.listing.address);
      setPosition([data.getListing.listing.latitude, data.getListing.listing.longitude]);
      setCategories(
        data.getListing.listing.categories.map((item: any) => item.type)
      );
      setStatus(data.getListing.listing.status);
      setTrade(data.getListing.listing.canTrade);
      setCash(data.getListing.listing.canPayCash);
      setBank(data.getListing.listing.canPayBank);
      setWeight(data.getListing.listing.weight);
      setVolume(data.getListing.listing.volume);
      setMaterials(
        data.getListing.listing.materials.map((item: any) => item.type)
      );
      setTradeCategories(
        data.getListing.listing.wantToTradeFor.map((item: any) => item.type)
      );
      setPrice(data.getListing.listing.price);
    }
  }, [data]);

  useEffect(() => {
    // set the location from the user's location, when making a new listing
    if (id === undefined && !hasSetLocationFromUser) {
      const email = auth?.email ? auth.email : "";
      getUserAddress({ variables: { email } });

      if (userResults?.data) {
        setLocation(userResults.data.getUser.user.address);
        setPosition([userResults.data.getUser.user.latitude, userResults.data.getUser.user.longitude])
        setHasSetLocationFromUser(true);
      }
    }
  }, [auth, userResults]);

  const check = () => {
    return (
      title &&
      image &&
      description &&
      location &&
      price &&
      (trade || cash || bank)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
        gap: 40,
        mt: 10,
        mb: 10
      }}
    >
      <Toast toast={errorToast} setToast={setErrorToast} type="warning" />
      <Toast toast={successToast} setToast={setSuccessToast} type="success" />

      {/** Left Section */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}>
          Item Information
        </Typography>
        <TextField
          value={title}
          label="Title"
          variant="outlined"
          sx={{ mb: 1 }}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Card
          variant="outlined"
          sx={{ height: 280, width: 450, borderRadius: 4 }}
        >
          {image ? (
            <img
              src={image}
              alt="profile"
              style={{ height: "100%", width: "100%" }}
            />
          ) : (
            <></>
          )}
        </Card>
        <Button component="label" sx={{ mb: 1, mt: 1 }}>
          Select Photo
          <input
            id="bob"
            ref={ref}
            type="file"
            hidden
            accept="image/png, image/jpeg"
            onChange={async () => {
              if (ref.current.files[0])
                setImage(await uploadFile(ref.current.files[0]));
            }}
          />
        </Button>
        <TextField
          value={description}
          label="Description"
          variant="outlined"
          sx={{ mb: 1.5 }}
          multiline
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Typography sx={{ fontSize: 16, fontWeight: "bold", mb: 1.5, ml: 0.5 }}>
          Location
        </Typography>
        <AddressSearch
          address={location}
          setAddress={setLocation}
          setPosition={setPosition}
          placeholder={"location"}
          marginBottom={1.5}
        />
        <CategorySearch
          categories={categories || undefined}
          setCategories={setCategories}
          validCategories={validTradeCategories}
          title="Category"
          width={450}
        />
        {props.edit ? <Slider status={status} setStatus={setStatus} /> : <></>}
      </Box>

      {/** Right Section */}
      <Box sx={{ display: "flex", flexDirection: "column", width: 450 }}>
        <Typography sx={{ fontSize: 18, fontWeight: "bold", mb: 2 }}>
          {props.have ? HAVE_LISTING_TITLE : WANT_LISTING_TITLE}
        </Typography>
        <Typography sx={{ fontSize: 16, mb: 0.5, ml: 0.5 }}>
          Accepted Trade / Payment Methods
        </Typography>
        <FormControl
          sx={{ m: 0.5, mb: 1.5 }}
          component="fieldset"
          variant="standard"
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={trade} onChange={() => setTrade(!trade)} />
              }
              label="Trade for another item"
            />
            <FormControlLabel
              control={
                <Checkbox checked={cash} onChange={() => setCash(!cash)} />
              }
              label="Payment in cash"
            />
            <FormControlLabel
              control={
                <Checkbox checked={bank} onChange={() => setBank(!bank)} />
              }
              label="Payment by bank transfer or payment service"
            />
          </FormGroup>
        </FormControl>
        <Typography sx={{ fontSize: 16, fontWeight: "bold", mb: 1.5, ml: 0.5 }}>
          Approximate Item Stats
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <TextField
            value={weight}
            type="number"
            label="Weight (kg)"
            variant="outlined"
            onChange={(e) => setWeight(parseInt(e.target.value))}
          />
          <Typography sx={{ fontSize: 16 }}>or</Typography>
          <TextField
            value={volume}
            type="number"
            label="Volume (cubic m)"
            variant="outlined"
            onChange={(e) => setVolume(parseInt(e.target.value))}
          />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: "bold", mb: 1.5, ml: 0.5 }}>
          Materials
        </Typography>
        <CategorySearch
          categories={materials || undefined}
          setCategories={setMaterials}
          validCategories={validMaterialCategories}
          title="Materials"
          width={"100%"}
        />
        <Typography
          sx={{ fontSize: 16, fontWeight: "bold", mb: 1.5, ml: 0.5, mt: 1.5 }}
        >
          Willing To Trade For Categories
        </Typography>
        <CategorySearch
          categories={tradeCategories || undefined}
          setCategories={setTradeCategories}
          validCategories={validTradeCategories}
          title="Trade Categories"
          width={"100%"}
        />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2.5, mb: 2.5 }}>
          <Typography
            sx={{ fontSize: 16, fontWeight: "bold", mr: 2.5, ml: 0.5 }}
          >
            Price
          </Typography>
          <TextField
            value={price}
            type="number"
            label="Price"
            variant="outlined"
            onChange={(e) => setPrice(parseInt(e.target.value))}
            sx={{ width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>
        {props.edit ? (
          <Box sx={{ display: "flex", mt: 1.5, width: "100%" }}>
            <Button
              variant="outlined"
              sx={{ borderRadius: 30, mr: 0.5, width: "50%", height: 45 }}
              onClick={() => {
                if (weight <= 0 && volume <= 0) {
                  setErrorToast(
                    "Either weight or volume must be greater than 0"
                  );
                  return;
                }
                if (!check()) {
                  setErrorToast("Required fields are empty");
                  return;
                }
                updateListing({
                  variables: {
                    id,
                    title,
                    image,
                    description,
                    location,
                    categories,
                    status,
                    trade,
                    cash,
                    bank,
                    weight,
                    volume,
                    materials,
                    tradeCategories,
                    price,
                    latitude: position.length === 2 ? position[0] : null,
                    longitude: position.length === 2 ? position[1] : null,
                  },
                })
                  .then(() => {
                    // if (!_2.data.updateListing.success) throw Error(_2.data.updateListing.errors)
                    setSuccessToast("Successfully updated listing");
                  })
                  .catch((e) => setErrorToast("Failed to update listing " + e));
              }}
            >
              Update {props.have ? "Have" : "Want"} Listing
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 30, ml: 0.5, width: "50%", height: 45 }}
              onClick={() => {
                deleteListing({ variables: { id } })
                  .then(() => {
                    // if (!_1.data.deleteListing.success) throw Error(_1.data.deleteListing.errors)
                    router.push("/listing/my-listings");
                  })
                  .catch((e) =>
                    setErrorToast("Failed to delete listing: " + e)
                  );
              }}
            >
              Delete Listing
            </Button>
          </Box>
        ) : (
          <Button
            variant="outlined"
            sx={{ borderRadius: 30, width: "100%", height: 45 }}
            onClick={() => {
              if (weight <= 0 && volume <= 0) {
                setErrorToast("Either weight or volume must be greater than 0");
                return;
              }
              if (!check()) {
                setErrorToast("Required fields are empty");
                return;
              }
              createListing({
                variables: {
                  email: auth?.email,
                  sell: !!props.have,
                  title,
                  image,
                  description,
                  location,
                  categories,
                  status,
                  trade,
                  cash,
                  bank,
                  weight,
                  volume,
                  materials,
                  tradeCategories,
                  price,
                  latitude: position.length === 2 ? position[0] : null,
                  longitude: position.length === 2 ? position[1] : null,
                },
              })
                .then(() => {
                  // if (!_3.data.createListing.success) throw Error(_3.data.createListing.errors)
                  router.push("/listing/my-listings");
                })
                .catch((e) => setErrorToast("Failed to create listing: " + e));
            }}
          >
            Post {props.have ? "Have" : "Want"} Listing
          </Button>
        )}
      </Box>
    </Box>
  );
};
