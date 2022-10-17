import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import dynamic from "next/dynamic";
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
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useRouter } from "next/router";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
/////////////////////////////////////////////////////////////////////////////
// Data Types
/////////////////////////////////////////////////////////////////////////////

// We should define the structure of the response from API as a type @frontend team

interface HaveListingProps {
  location: string;
  title: string;
  image: string;
  categories: string[];
  description: string;
  trader: string;
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

const DetailedHaveListing: NextPage = () => {
  // Get item name from query params
  const router = useRouter();
  const { title } = router.query;

  const Map = dynamic(() => import("../../components/generic/Map"), {
    ssr: false
  });

  const image =
    "https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const categories = ["asdfsadf", "asdfdf", "asdfsa", "asdfsa", "asdfsa"];
  const trader = "Sean";
  const cash = true;
  const trade = true;
  const bank = true;
  const price = 453;
  const location =
    "The University of New South Wales High St Kensington NSW 2033";

  // Create description field given boolean parameters
  let purchaseOptions = "";
  if ((cash || bank) && !trade) purchaseOptions = `purchase for $${price}`;
  else if ((cash || bank) && trade)
    purchaseOptions = `purchase for $${price} or by mutual trade`;
  else if (!(cash || bank) && trade)
    purchaseOptions = `acquire by mutual trade`;
  else purchaseOptions = `not available`;

  let itemPosessor = `${trader} has this item`;

  let shippingOptions = "";
  if (cash && bank)
    shippingOptions = "cash or bank transfer on pickup or delivery";
  else if (cash && !bank) shippingOptions = "cash on pickup or delivery";
  else if (!cash && bank)
    shippingOptions = "bank transfer on pickup or delivery";
  else shippingOptions = "not applicable";

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Template title="Have Listing" center scrollable>
      <Stack spacing={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 40,
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
              icon={<AttachMoneyIcon />}
              description={purchaseOptions}
            />
            <DescriptionBox icon={<PersonIcon />} description={itemPosessor} />
            <DescriptionBox
              icon={<LocalShippingIcon />}
              description={shippingOptions}
            />
          </Box>

          {/** Information Section */}
          <Box sx={{ display: "flex", flexDirection: "column", width: 500 }}>
            <LabelBox title="Location">
              <Stack direction="row">
                <Tooltip title="Show on Map">
                  <IconButton>
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
            <LabelBox title="Description">
              <Typography fontSize={16} variant="body2">
                Location askdjfh lkasjdfh lksajdhf lkajsdh flkjsdh fljkash
                fljkahsd lfjksahd lfjkhsa kfjh lsadkjf hl lsjdf hklsaj hflkjsadh
                flkajsh f
              </Typography>
            </LabelBox>
            <Button
              variant="outlined"
              sx={{ borderRadius: 30, mt: 4, height: 45 }}
              href={`/trade/propose?user=${trader}`}
            >
              Propose Trade
            </Button>
            <Box sx={{ display: "flex", mt: 1.5, width: "100%" }}>
              <Button
                variant="outlined"
                sx={{ borderRadius: 30, mr: 0.5, width: "50%", height: 45 }}
                href={`/chat/chat?user=${trader}`}
              >
                Message User
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: 30, ml: 0.5, width: "50%", height: 45 }}
                href={`/profile/visitor-profile?user=${trader}`}
              >
                View Trader Profile
              </Button>
            </Box>
          </Box>
        </Box >
        <Box>
          <Typography>Map</Typography>
          <Box sx={{width: 1000, height: 600}}>
            <Map position={[-33.8688, 151.2093]}></Map>
          </Box>
        </Box>
      </Stack>
    </Template>
  );
};

export default DetailedHaveListing;
