import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BrushIcon from '@material-ui/icons/Brush';

export default function UsersCard(props) {
    return (

        <List style={{ maxHeight: 500, overflow: 'auto' }}>
            <ListItem>
                <ListItemAvatar>
                    <BrushIcon></BrushIcon>
                </ListItemAvatar>
                <ListItemAvatar>
                    <Avatar src="/broken-image.jpg">
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.Drawner.name} />
                <ListItemText primary={props.Drawner.score} />
            </ListItem>
            {
                props.Users.map((user, index) => {
                    return (
                        <ListItem>
                            {
                                user.hit ?
                                    <ListItemAvatar>
                                        <CheckCircleIcon style={{color:'green'}}></CheckCircleIcon>
                                    </ListItemAvatar>
                                    :
                                    <ListItemAvatar>
                                    </ListItemAvatar>
                            }
                            <ListItemAvatar>
                                <Avatar src="/broken-image.jpg">
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.name} />
                            <ListItemText primary={user.score} />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}