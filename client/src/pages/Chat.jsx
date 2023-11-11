import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import '../styles/chat.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
    overflow: 'hidden',
  },
  userList: {
    maxHeight: 'calc(80vh - 60px)', // Adjust the value as needed
    overflowY: 'auto',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

const Chat = () => {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API endpoint
    fetch('http://localhost:4000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    
    console.log('Message sent:', messageInput);
  };

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const [messageInput, setMessageInput] = useState('');

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List className={classes.userList}>
            {users.map((user) => (
              <ListItem
                button
                key={user._id}
                onClick={() => handleUserClick(user)}
                selected={selectedUser && selectedUser._id === user._id}
              >
                <ListItemIcon>
                  <Avatar alt={user.firstName} src={user.avatar} />
                </ListItemIcon>
                <ListItemText primary={user.firstName} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          {selectedUser && (
            <>
              {selectedUser.messages && selectedUser.messages.length > 0 ? (
                <List className={classes.messageArea}>
                  {selectedUser.messages.map((message) => (
                    <ListItem key={message.id}>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align={message.sender === 'user' ? 'right' : 'left'}
                            primary={message.text}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align={message.sender === 'user' ? 'right' : 'left'}
                            secondary={message.timestamp}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography style={{ color: 'red', fontStyle: 'bold' }}>{selectedUser.firstName}</Typography>

              )}
              <Divider />
              <Grid container style={{ padding: '10px' }}>
                <Grid className='c1' item xs={11}>
                  <TextField
                  
                    id="outlined-basic-email"
                    label="Type Something"
                    fullWidth
                    value={messageInput}
                    onChange={handleMessageInputChange}
                  />
                </Grid>
                <Grid className='c2' xs={1} align="right">
                  <Fab color="primary" aria-label="add" onClick={handleSendMessage}>
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;