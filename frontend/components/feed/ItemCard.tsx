import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export interface GraphqlListing {
  title: string;
  id: number;
  description: string;
  price: number;
  image: string;
  address: string;
  user: GraphqlUser;
  isSellListing: boolean;
}

interface GraphqlUser {
  displayImg: string;
}

export const itemDataToItemCard = (item: GraphqlListing) => {
    return (
      <ItemCard
        title={item.title}
        price={item.price}
        image={item.image}
        avatar={item.user.displayImg}
        location={item.address}
        href={
          item.isSellListing
            ? `/detailed-listing/have?=id${item.id}`
            : `/detailed-listing/want?=id${item.id}`
        }
      />
    );
  };

export interface ItemCardProps {
  title: string;
  price: number;
  location: string;
  image: string;
  avatar: string;
  want: boolean;
}

const ItemCard = (props: {
  title: string;
  price: number;
  location: string;
  image: string;
  avatar: string;
  href?: string;
  onClick?: () => void;
}) => {
  return (
    <Link href={props.href || ''}>
      <Card sx={{ maxWidth: 345, margin: '8px' }} onClick={props.onClick}>
        <CardMedia component='img' height='194' image={props.image} alt={props.title} />
        <CardHeader title={props.title} />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            Price ${props.price}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            {props.location}
          </Typography>
          <Avatar src={props.avatar}></Avatar>
        </CardActions>
      </Card>
    </Link>
  )
}
