import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { useStore } from "../../store/store";
import {
  GET_DETAILED_LISTING,
  GET_USER_DETAILED_LISTING,
} from "../../utils/queries";
import dynamic from "next/dynamic";

/////////////////////////////////////////////////////////////////////////////
// Secondary Components
/////////////////////////////////////////////////////////////////////////////

const LabelBox = (props: {
  title: string;
  children?: JSX.Element | JSX.Element[];
}) => {
  return (
    <Box sx={{ mb: 2, display: "flex" }}>
      <Box sx={{ width: 350 }}>
        <Typography sx={{ fontWeight: "bold" }}>{props.title}</Typography>
      </Box>
      <Box sx={{ width: 600 }}>{props.children}</Box>
    </Box>
  );
};

const DescriptionBox = (props: { icon: any; description: string }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar sx={{ ml: 2, mr: 2 }}>{props.icon}</Avatar>
      <Typography>{props.description}</Typography>
    </Box>
  );
};

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DetailedWantListing: NextPage = () => {
  // Get item name from query params
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useStore();
  const [execQuery, { data }] = useLazyQuery(
    auth ? GET_USER_DETAILED_LISTING : GET_DETAILED_LISTING
  );

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [trade, setTrade] = useState<boolean>(false);
  const [cash, setCash] = useState<boolean>(false);
  const [bank, setBank] = useState<boolean>(false);
  const [tradeCategories, setTradeCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [itemPosessor, setItemPossesor] = useState("");
  const [itemPosessorImageURL, setItemPossesorImageURL] = useState("");
  const [itemPosessorEmail, setItemPossesorEmail] = useState("");
  const [position, setPosition] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (id) {
      if (auth?.email) {
        execQuery({ variables: { id: id, userEmail: auth?.email } });
      } else {
        execQuery({ variables: { id } });
      }
    }
    if (data && data?.getListing.listing) {
      const listing = data?.getListing.listing;
      setTitle(listing.title);
      setImage(listing.image);
      setDescription(listing.description);
      setLocation(listing.address);
      setCategories(listing.categories.map((item: any) => item.type));
      setTrade(listing.canTrade);
      setCash(listing.canPayCash);
      setBank(listing.canPayBank);
      setTradeCategories(listing.wantToTradeFor.map((item: any) => item.type));
      setPrice(listing.price);
      setItemPossesor(listing.user.username);
      setItemPossesorImageURL(listing.user.displayImg);
      setItemPossesorEmail(listing.user.email);
      setPosition([listing.latitude, listing.longitude]);
    }
  }, [data, id]);

  const redirect = () => {
    router.push("/auth/login");
  };

  // Create description field given boolean parameters
  let rewardOptions = "";
  if ((cash || bank) && !trade) rewardOptions = `reward of $${price}`;
  else if ((cash || bank) && trade)
    rewardOptions = `reward of $${price} or a mutual trade`;
  else if (!(cash || bank) && trade) rewardOptions = `mutual trade only`;
  else rewardOptions = `not available`;

  let buyer = `${itemPosessor} wants this item`;

  let paymentOptions = "";
  if (cash && bank) paymentOptions = "cash on pickup or bank transfer";
  else if (cash && !bank) paymentOptions = "cash on pickup only";
  else if (!cash && bank) paymentOptions = "bank transfer only";
  else paymentOptions = "not applicable";

  const Map = dynamic(() => import("../../components/location/Map"), {
    ssr: false,
  });

  const mapRef = useRef();

  function scrollMap() {
    // @ts-ignore
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Template title="Want Listing" center scrollable>
      <Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
            mt: 20,
            mb: 10
          }}
        >
          {/** Item Image Section */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card
              variant="outlined"
              sx={{ height: 280, width: 400, borderRadius: 4 }}
            >
              {image ? (
                <img
                  src={image}
                  alt="profile"
                  style={{ height: 280, width: 400 }}
                />
              ) : (
                <></>
              )}
            </Card>
            <Typography sx={{ p: 3, pl: 4, fontSize: 20, fontWeight: "bold" }}>
              {title}
            </Typography>
            <DescriptionBox
              icon={<Avatar src={itemPosessorImageURL}></Avatar>}
              description={buyer}
            />
            <DescriptionBox
              icon={<AttachMoneyIcon />}
              description={rewardOptions}
            />
            <DescriptionBox
              icon={<LocalShippingIcon />}
              description={paymentOptions}
            />
          </Box>

          {/** Information Section */}
          <Box sx={{ display: "flex", flexDirection: "column", width: 500 }}>
            <LabelBox title="Location">
              <Stack direction="row">
                <Tooltip title="Show on Map">
                  <IconButton onClick={scrollMap}>
                    <LocationOnIcon />
                  </IconButton>
                </Tooltip>
                <Typography fontSize={16} variant="body2">
                  {location}
                </Typography>
              </Stack>
            </LabelBox>
            <LabelBox title="Categories">
              <Box
                sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
              >
                {categories.map((category) => (
                  <Box
                    sx={{
                      border: 1,
                      width: 140,
                      p: 1,
                      borderRadius: 10,
                      m: 0.5,
                      textAlign: "center",
                      color: "#616161",
                    }}
                  >
                    {category}
                  </Box>
                ))}
              </Box>
            </LabelBox>
            <LabelBox title="Want to Trade For Categories">
              <Box
                sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
              >
                {tradeCategories.map((category) => (
                  <Box
                    sx={{
                      border: 1,
                      width: 140,
                      p: 1,
                      borderRadius: 10,
                      m: 0.5,
                      textAlign: "center",
                      color: "#616161",
                    }}
                  >
                    {category}
                  </Box>
                ))}
              </Box>
            </LabelBox>
            <LabelBox title="Description">
              <Typography fontSize={16} variant="body2">
                {description}
              </Typography>
            </LabelBox>
            <Button
              variant="outlined"
              sx={{ borderRadius: 30, mt: 4, height: 45 }}
              onClick={
                !auth
                  ? redirect
                  : () => {
                    router.push(
                      `/trade/propose?email=${itemPosessorEmail}&id=${id}`
                    );
                  }
              }
            >
              Propose Trade
            </Button>
            <Box sx={{ display: "flex", mt: 1.5, width: "100%" }}>
              <Button
                variant="outlined"
                sx={{ borderRadius: 30, mr: 0.5, width: "50%", height: 45 }}
                onClick={
                  !auth
                    ? redirect
                    : () => {
                      router.push(`/chat/chat?other=${itemPosessorEmail}`);
                    }
                }
              >
                Message User
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: 30, ml: 0.5, width: "50%", height: 45 }}
                onClick={
                  !auth
                    ? redirect
                    : () => {
                      router.push(
                        `/profile/visitor-profile?email=${itemPosessorEmail}`
                      );
                    }
                }
              >
                View Trader Profile
              </Button>
            </Box>
          </Box>
        </Box>
        <Box ref={mapRef} sx={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Map width={800} height={600} position={position} />
        </Box>
      </Stack>
    </Template>
  );
};
export default DetailedWantListing;
