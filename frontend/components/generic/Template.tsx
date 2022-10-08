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
import { useState } from 'react';
import { Header } from './Header';
import Link from 'next/link';
import List from '@mui/material/List';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { getAuth } from '@firebase/auth';
import { Toast } from './Toast';
import { useStore, useStoreUpdate } from '../../store/store';
import Image from 'next/image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import LockIcon from '@mui/icons-material/Lock';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useRouter } from 'next/router';

type SideBarProps = { title: string; icon: Icon, href: string }[]

const sideBarTop: SideBarProps = [
  { title: 'All Listings', icon: LocalOfferIcon, href: '/' },
  { title: 'Methodology', icon: DescriptionIcon, href: '/environment/methodology' },
]

/**************** LOGGED IN *****************/

const sideBarBottomLoggedIn: SideBarProps = [
  { title: 'Profile', icon: PersonIcon, href: '/profile/user-profile' },
  { title: 'Dashboard', icon: QueryStatsIcon, href: '/environment/dashboard' },
  { title: 'My Offers', icon: AssignmentTurnedInIcon, href: '/trade/offers-list' },
  { title: 'My Listings', icon: StorefrontIcon, href: '/listing/my-listings' },
  { title: 'Logout', icon: LockOpenIcon, href: '/' }
]

/*************** LOGGED OUT *****************/

const sideBarBottomLoggedOut: SideBarProps = [
  { title: 'Login', icon: LockIcon, href: '/auth/login' }
]

/****************** OTHER *******************/

type Icon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string
}

const textColor = '#6b6b6b'

const theme = createTheme({
  palette: {
    primary: {
      main: '#616161',
    },
    secondary: {
      main: '#4f00b0',
    },
  },
})

//////////////////////////////////////////////////////////////////
// Main Component
//////////////////////////////////////////////////////////////////

export const Template = (props: {
  title: string
  children?: (JSX.Element | string)[] | JSX.Element | string
}) => {
  const { auth } = useStore()
  const [drawer, setDrawer] = useState<boolean>(false);
  const [toast, setToast] = useState<string>('');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header header={props.title} />
      <Toast toast={toast} setToast={setToast} type='success' />
      <AppBar position="static" style={{ background: '#e6e6e6' }} elevation={0}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2, color: textColor }}
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Link href='/'>
            <Image src='/logo.png' alt='logo' width={35} height={35} />
          </Link>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, color: textColor, ml: 1.5, letterSpacing: 4 }}>
            Swapr
          </Typography>
          {!auth && <RegisterLoggedOut />}
          {auth ? <LoggedIn setDrawer={() => setDrawer(true)} /> : <LoggedOut />}
        </Toolbar>
      </AppBar>
      <SideBar drawer={drawer} setDrawer={setDrawer} />
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </Box>
  )
}

const LoggedIn = (props: {
  setDrawer: () => void;
}) => {
  return (
    <div>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={props.setDrawer}
        sx={{ color: textColor }}
      >
        <AccountCircle />
      </IconButton>
    </div>
  )
}

const LoggedOut = () => {
  return (
    <Button sx={{ color: textColor }} href='/auth/login'>
      Login
    </Button>
  )
}

const RegisterLoggedOut = () => {
  return (
    <Button sx={{ color: textColor }} href='/auth/register'>
      Register
    </Button>
  )
}

const SideBar = (props: { drawer: boolean; setDrawer: (arg: boolean) => void }) => {
  const { drawer, setDrawer } = props
  const { auth } = useStore()
  const setStore = useStoreUpdate()
  const router = useRouter()
  const sideBarBottom = auth ? sideBarBottomLoggedIn : sideBarBottomLoggedOut

  return (
    <Drawer anchor={'left'} open={drawer} onClose={() => setDrawer(false)}>
      <Box sx={{ width: 250 }} role='presentation' onClick={() => setDrawer(false)}>
        <List>
          {sideBarTop.map((item) => {
            return (
              <ListItem button key={item.title} onClick={() => router.push(item.href)}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            )
          })}
        </List>
        <Divider />
        <List>
          {sideBarBottom.map((item) => {
            return (
              <ListItem button key={item.title} onClick={() => {
                if (item.title === 'Logout') {
                  getAuth().signOut()
                  setStore({ auth: null })
                }
                else {
                  router.push(item.href)
                }
              }}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}
