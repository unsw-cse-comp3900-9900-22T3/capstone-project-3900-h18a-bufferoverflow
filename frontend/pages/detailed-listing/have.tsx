import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useStore } from "../../store/store";

/////////////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////////////

export const GET_DETAILED_LISTING = gql`
  query ($id: ID!) {
    getListing(id: $id) {
      listing {
        id
        user {
          username
          displayImg
          email
        }
        title
        categories {
          type
        }
        wantToTradeFor {
          type
        }
        image
        description
        address
        price
        canTrade
        canPayCash
        canPayBank
      }
      errors
      success
    }
  }
`

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
  email: string;
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

const DescriptionBox = (props: {
  icon: any;
  description: string;
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar sx={{ ml: 2, mr: 2 }}>
        {props.icon}
      </Avatar>
      <Typography>{props.description}</Typography>
    </Box>
  )
}

/////////////////////////////////////////////////////////////////////////////
// Primary Components
/////////////////////////////////////////////////////////////////////////////

const DetailedHaveListing: NextPage = () => {

  // Get item name from query params
  const router = useRouter()
  const { id } = router.query;
  const { auth } = useStore();
  const data = useQuery(GET_DETAILED_LISTING, { variables: { id } }).data?.getListing
    .listing;

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

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setImage(data.image);
      setDescription(data.description);
      setLocation(data.address);
      setCategories(data.categories.map((item: any) => item.type));
      setTrade(data.canTrade);
      setCash(data.canPayCash);
      setBank(data.canPayBank);
      setTradeCategories(data.wantToTradeFor.map((item: any) => item.type));
      setPrice(data.price);
      setItemPossesor(data.user.username);
      setItemPossesorImageURL(data.user.displayImg);
      setItemPossesorEmail(data.user.email);
    }
  }, [data]);

  // Create description field given boolean parameters
  let purchaseOptions = ''
  if ((cash || bank) && !trade) purchaseOptions = `purchase for $${price}`
  else if ((cash || bank) && trade) purchaseOptions = `purchase for $${price} or by mutual trade`
  else if (!(cash || bank) && trade) purchaseOptions = `acquire by mutual trade`
  else purchaseOptions = `not available`

  let shippingOptions = ''
  if (cash && bank) shippingOptions = 'cash or bank transfer on pickup or delivery'
  else if (cash && !bank) shippingOptions = 'cash on pickup or delivery'
  else if (!cash && bank) shippingOptions = 'bank transfer on pickup or delivery'
  else shippingOptions = 'not applicable'

  const redirect = () => {router.push("/login")}

  return (
    <Template title="Have Listing" center>
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
            icon={<Avatar src={itemPosessorImageURL}></Avatar>}
            description={`${itemPosessor} has this item`}
          />
          <DescriptionBox
            icon={<AttachMoneyIcon />}
            description={purchaseOptions}
          />
          <DescriptionBox
            icon={<LocalShippingIcon />}
            description={shippingOptions}
          />
        </Box>

        {/** Information Section */}
        <Box sx={{ display: "flex", flexDirection: "column", width: 500 }}>
          <LabelBox title="Location">
            <Typography fontSize={16} variant="body2">
              {location}
            </Typography>
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
    </Template>
  );
};

export default DetailedHaveListing