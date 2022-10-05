import { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import Link from 'next/link'

const toFetchPrice = 9999
const toFetchLocation = 'Kensingston, NSW'
const detailedItemListingRoute = '/register'
const toFetchImageURL =
  'https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
const avatarImageURL = 'https://mui.com/static/images/avatar/3.jpg'

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Link href={detailedItemListingRoute}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component='img' height='194' image={toFetchImageURL} alt='Used Kayak' />
        <CardHeader title='Used Kayak' />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            Price ${toFetchPrice}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='body2' color='text.secondary'>
            {toFetchLocation}
          </Typography>
          <Avatar sx={{ bgcolor: red[500] }} src={avatarImageURL}></Avatar>
        </CardActions>
      </Card>
    </Link>
  )
}
