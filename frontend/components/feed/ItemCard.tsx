import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

const detailedItemListingRoute = '/register'

const data = {
  title: 'Used Kayak',
  price: 9999,
  location: 'Kensingston, NSW',
  image:
    'https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  avatar: 'https://mui.com/static/images/avatar/3.jpg',
}

export default function RecipeReviewCard() {
  return (
    <Link href={detailedItemListingRoute}>
      <Card sx={{ maxWidth: 345, margin: '8px' }}>
        <CardMedia component='img' height='194' image={data.image} alt={data.title} />
        <CardHeader title={data.title} />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            Price ${data.price}
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
            {data.location}
          </Typography>
          <Avatar src={data.avatar}></Avatar>
        </CardActions>
      </Card>
    </Link>
  )
}
