import React from 'react'
import {
  Button,
  createTheme,
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  ThemeProvider
} from '@mui/material';
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
import AdbIcon from '@mui/icons-material/Adb';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { getAuth } from '@firebase/auth';
import { Toast } from './Toast';

type Icon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
}

const textColor = '#6b6b6b'
const sideBarTop: { title: string, icon: Icon }[] = [
  { title: 'Trade', icon: CardTravelIcon },
  { title: 'Want To Buy', icon: LocalOfferIcon },
]
const sideBarBottom: { title: string, icon: Icon }[] = [
  { title: 'Account', icon: PersonIcon },
]

const theme = createTheme({
  palette: {
    primary: {
      main: '#616161',
    },
    secondary: {
      main: '#4f00b0',
    },
  },
});

export const Template = (props: {
  title: string;
  children?: (JSX.Element | string)[] | JSX.Element | string;
}) => {
  const auth = false; // change this
  const [drawer, setDrawer] = useState<boolean>(false);
  const [toast, setToast] = useState<string>('');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toast toast={toast} setToast={setToast} type='success' />
      <AppBar position="static" style={{ background: '#e6e6e6' }} elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: textColor }}
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <a href='/'>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, color: textColor, mr: 1.5 }} />
          </a>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: textColor }}>
            {props.title}
          </Typography>
          {
            !auth &&
            <RegisterLoggedOut />
          }
          {
            auth
              ? <LoggedIn />
              : <LoggedOut />
          }
        </Toolbar>
      </AppBar>
      <SideBar drawer={drawer} setDrawer={setDrawer} />
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
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
        <MenuItem onClick={() => {
          handleClose()
        }}>Profile</MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          getAuth().signOut()
        }}>Log out</MenuItem>
      </Menu>
    </div>
  )
}

const LoggedOut = () => {
  return (
    <Button sx={{ color: textColor }} href='/login'>Login</Button>
  )
}

const RegisterLoggedOut = () => {
  return (
    <Button sx={{ color: textColor }} href='/register'>Register</Button>
  )
}

const SideBar = (props: {
  drawer: boolean;
  setDrawer: (arg: boolean) => void;
}) => {
  const { drawer, setDrawer } = props
  return (
    <Drawer
      anchor={'left'}
      open={drawer}
      onClose={() => setDrawer(false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setDrawer(false)}
      >
        <List>
          {
            sideBarTop.map(item => {
              return (
                <ListItem button key={item.title}>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              )
            })
          }
        </List>
        <Divider />
        <List>
          {
            sideBarBottom.map(item => {
              return (
                <ListItem button key={item.title}>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              )
            })
          }
        </List>
      </Box>
    </Drawer>
  )
}