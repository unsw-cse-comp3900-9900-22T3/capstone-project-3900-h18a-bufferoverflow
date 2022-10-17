import {
  Box,
  Card,
  Divider,
  Typography,
} from "@mui/material";

export const AuthCard = (props: {
  title: string
  children?: (JSX.Element | string)[] | JSX.Element | string
}) => {
  return (
    <Card
      variant='outlined'
      sx={{
        width: 420,
        minHeight: 450,
        padding: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        flexDirection: "column",
        paddingBottom: 6
      }}
    >
      <Typography variant="h5" color="primary" component="h2" sx={{mt: 4}}>
        {props.title}
      </Typography>
      <Divider sx={{ mb: 5, mt: 2, width: 200 }} />
      {props.children}
    </Card>
  )
}
