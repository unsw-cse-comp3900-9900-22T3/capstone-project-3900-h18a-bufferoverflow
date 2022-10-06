import Box from '@mui/material/Box'
import ItemCard from './ItemCard'
import { useState, useEffect } from 'react'

export default function ItemCards() {
  const [items, setItems] = useState([])
  useEffect(() => {}, [])

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </Box>
  )
}
