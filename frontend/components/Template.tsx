import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Header } from './Header';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';

const textColor = '#6b6b6b'

export const Template = (props: {
  title: string;
  children?: (JSX.Element | string)[] | JSX.Element | string;
}) => {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header header={props.title} />
      <AppBar position="static" style={{ background: '#e6e6e6' }} elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: textColor }}
          >
            <MenuIcon />
          </IconButton>

          <Link href='/'>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, color: textColor, mr: 1.5 }} />
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: textColor }}>
            {props.title}
          </Typography>
          {
            auth
              ? <LoggedIn />
              : <LoggedOut />
          }
        </Toolbar>
      </AppBar>
      {props.children}
    </Box>
  );
}

const LoggedIn = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{ color: textColor }}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
    </div>
  )
}

const LoggedOut = () => {
  return (
    <Button sx={{ color: textColor }} href='/login'>Login</Button>
  )
}