import React, {useState, useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { useHistory, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import QuizSharpIcon from '@mui/icons-material/QuizSharp';
import DashboardCustomizeSharpIcon from '@mui/icons-material/DashboardCustomizeSharp';
import ForumSharpIcon from '@mui/icons-material/ForumSharp';
import VideoLibrarySharpIcon from '@mui/icons-material/VideoLibrarySharp';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const drawerWidth = 240;

const menuItemsSt = [
    { 
      text: 'Profile', 
      icon: <PersonIcon color="secondary" />, 
      path: '/profile/:id' 
    },
    { 
      text: 'Quiz', 
      icon: <QuizSharpIcon color="secondary" />, 
      path: '/quiz' 
    },
    { 
      text: 'Flashcard', 
      icon: <DashboardCustomizeSharpIcon color="secondary" />, 
      path: '/flashcard' 
    },
    { 
      text: 'Forum', 
      icon: <ForumSharpIcon color="secondary" />, 
      path: '/forum' 
    },
    { 
      text: 'Video', 
      icon: <VideoLibrarySharpIcon color="secondary" />, 
      path: '/video' 
    },
    // { 
    //   text: 'Chat', 
    //   icon: <ChatSharpIcon color="secondary" />, 
    //   path: '/chat' 
    // },
    { 
      text: 'Note', 
      icon: <DescriptionRoundedIcon color="secondary" />, 
      path: '/note' 
    },
    { 
      text: 'Submission', 
      icon: <BackupRoundedIcon color="secondary" />, 
      path: '/submission' 
    },
    { 
      text: 'Class', 
      icon: <SchoolRoundedIcon color="secondary" />, 
      path: '/class' 
    },

];

const menuItemsTc = [
    { 
      text: 'Profile', 
      icon: <PersonIcon color="secondary" />, 
      path: '/profile/:id' 
    },
    { 
      text: 'Quiz', 
      icon: <QuizSharpIcon color="secondary" />, 
      path: '/quiz' 
    },
    { 
      text: 'Forum', 
      icon: <ForumSharpIcon color="secondary" />, 
      path: '/forum' 
    },
    { 
      text: 'Video', 
      icon: <VideoLibrarySharpIcon color="secondary" />, 
      path: '/video' 
    },
    // { 
    //   text: 'Chat', 
    //   icon: <ChatSharpIcon color="secondary" />, 
    //   path: '/chat' 
    // },
    { 
      text: 'Note', 
      icon: <DescriptionRoundedIcon color="secondary" />, 
      path: '/note' 
    },
    { 
      text: 'Submission', 
      icon: <BackupRoundedIcon color="secondary" />, 
      path: '/submission' 
    },
    { 
      text: 'Class', 
      icon: <SchoolRoundedIcon color="secondary" />, 
      path: '/class' 
    },

];

const useStyles = makeStyles((theme) => {
    return{
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
        },
        root: {
            display: 'flex',
            minHeight: "100vh",
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        active: {
            // background: '#f4f4f4'
            background: '#e4f2f7'
        },
        title: {
            padding: 30
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        toolbar: theme.mixins.toolbar,
        space: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        },
        bottomPush: {
            position: "fixed",
            bottom: 0,
            textAlign: "center",
            paddingBottom: 10,
            paddingLeft: 60
        }

    }
})

const Layout = ({children,setAuth}) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [name, setName] = useState();
    const [role,setRole] = useState();

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    const SelectRole = () => {
        if(role === "student"){
            return 1;
        }else if(role === "teacher"){
            return 2;
        }
    };

    useEffect(() =>{
        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              setName(parseData.data.profile[0].fullname);
              setRole(parseData.data.profile[0].usertype);

            } catch (err) {
              console.error(err.message);
            }
        };

        getProfile();
    }, []);

    return(
        <div className={classes.root}>
            {/* app bar */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.space}>
                        {/* Test */}
                    </Typography>
                    <Typography>{name}</Typography>
                    <Avatar className={classes.avatar} src="/" />
                </Toolbar>
            </AppBar>
            
            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
                elevation={3}
            >
                <Box
                display="flex"
                height={100}
                >
                <Box m="auto">
                {/* <Typography variant="h5" className={classes.title}>
                    SmartRev
                </Typography> */}
                    {/* <img src="/logo.png" alt="logo" style={{height: 40, width: 125}}/> */}
                    <img src="/logo1.png" alt="logo"/>
                </Box>
                </Box>
                <Divider />

                {/* links/list section */}
                {SelectRole() === 1 && (
                    <List>
                    {menuItemsSt.map((item) => (
                        <ListItem 
                        button 
                        key={item.text} 
                        onClick={() => history.push(item.path)}
                        className={location.pathname == item.path ? classes.active : null}
                        sx={{height: 50}}
                        
                        >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                    </List>
                )}

                {SelectRole() === 2 && (
                    <List>
                    {menuItemsTc.map((item) => (
                        <ListItem 
                        button 
                        key={item.text} 
                        onClick={() => history.push(item.path)}
                        className={location.pathname == item.path ? classes.active : null}
                        sx={{height: 50}}
                        
                        >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                    </List>
                )}
                
                <div className={classes.bottomPush}>
                <Button onClick={e => logout(e)} variant="outlined" startIcon={<LogoutIcon />}>
                    Logout
                </Button>
                </div>
            </Drawer>
    
            {/* main content */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                { children }
            </div>
        </div>
    )
}

export default Layout;