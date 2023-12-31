import { useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/main.css';
import HandleDrawer from './Drawer/HandleDrawer.js';
import { auth } from '../firebase'; // Update the path to match your file structure
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { parseISO, isToday, format } from 'date-fns';
import Drawersend from './SendMessage/Drawersend';
import DisplayDataButton from './not2';


function Navbar({ user, onExport, allEvents }) {
  const navRef = useRef();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false); // New state for dropdown menu
  const [openNotif, setOpenNotif] = useState(false);
  const [openMyNot, setOpenMyNot] = useState(false);

  const handleMyNotOpen = () => {
    setOpenMyNot(true);
  };
  
  const now = new Date();
  const upcomingEvents = allEvents.filter(event => {
    const eventStart = parseISO(event.start);
    return isToday(eventStart) && eventStart > now;
  });
  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const handleAddEventClick = () => {
    console.log('handleAddEventClick called');
    setDrawerOpen(true);
  };

  // Get the user ID of the currently logged-in user
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleDropdownOpen = () => {
    setOpenDropdown(true);
  };

  const handleNotifOpen = () => {
    setOpenNotif(true);
  };

  

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const colors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div>
      <header>
        <Link style={{ position: 'relative', top: '4px' }}>
          <AccountCircleIcon style={{ color: 'white' }} onClick={handleProfileClick} />
        </Link>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: randomColor }}>
                  {user?.displayName?.[0]}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={user?.displayName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={user?.displayName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={user?.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={`Number of events scheduled: ${allEvents.length}`} />
            </ListItem>
          </List>
        </Popover>
        <div className="welcome" style={{ marginLeft: '-600px', fontSize: 18 }}>
          Welcome {user?.displayName}
        </div>
        <nav ref={navRef}>
          <button
            className="export-btn"
            style={{
              fontSize: 18,
              marginRight: '100px',
              position: 'absolute',
              right: 0,
              top: '13px',
            }}
            onClick={onExport}
          >
            Export Calendar
          </button>

          <button
            className="export-btn"
            style={{
              fontSize: 18,
              marginRight: '240px',
              position: 'absolute',
              right: 0,
              top: '13px',
            }}
            onClick={handleAddEventClick}
          >
            Add Event
          </button>

          
          <button
            className="export-btn"
            style={{
              fontSize: 18,
              marginRight: '380px',
              position: 'absolute',
              right: 0,
              top: '13px',
            }}
            onClick={handleDropdownOpen}
          >
            Msg
          </button>

          <button
            className="export-btn"
            style={{
              fontSize: 18,
              marginRight: '445px',
              position: 'absolute',
              right: 0,
              top: '13px',
            }}
            // Trigger handleMyNotOpen on button click
          >
            <DisplayDataButton/>
          </button>
          

          <button
            className="export-btn"
            style={{
              fontSize: 1,
              marginRight: '350px',
              position: 'absolute',
              right: 0,
              top: '18px',
            }}
            onClick={handleNotificationsOpen}
          >
            <NotificationsIcon style={{ fontSize: '20px', marginRight: '-15px' }} />
          </button>
          <a
            href="/#"
            style={{
              fontSize: 18,
              marginRight: '50px',
              position: 'absolute',
              right: 0,
              top: '22px',
            }}
            onClick={() => auth.signOut()}
          >
            Logout
          </a>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
      <HandleDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} userId={userId} />
      <Drawersend open={openDropdown} onClose={() => setOpenDropdown(false)} userId={userId} />
      

      <Dialog open={openNotifications} onClose={handleNotificationsClose}>
        <DialogTitle>Upcoming Notifications</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id}>
                  <p>{event.title} is scheduled on {format(parseISO(event.start), 'hh:mm a')} today</p>
                </div>
              ))
            ) : (
              <p>No events found</p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotificationsClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Navbar;
