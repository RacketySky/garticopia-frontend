import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BrushIcon from '@material-ui/icons/Brush';

export default function UsersCard(props) {

    function playerHit(playerhit, player) {
        if (playerhit !== undefined) {
            for (var i = 0; i < playerhit.length; i++){
                if(playerhit[i] === player.ID){
                    return true
                }
            }
        }
    }
    return (
        <List style={{ maxHeight: 500, overflow: 'auto' }}>
            {props.Drawner ?
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
                : <></>
            }
            {
                props.Users ?
                    props.Users.map((user, index) => {
                        return (
                            <ListItem key={index}>
                                {
                                    playerHit(props.PlayersHit, user) ?
                                        <ListItemAvatar>
                                            <CheckCircleIcon style={{ color: 'green' }}></CheckCircleIcon>
                                        </ListItemAvatar>
                                        :
                                        <ListItemAvatar>
                                        </ListItemAvatar>
                                }
                                <ListItemAvatar>
                                    <Avatar src="/broken-image.jpg">
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.playerName} />
                                <ListItemText primary={user.playerPoints} />
                            </ListItem>
                        )
                    })
                    : <></>
            }
        </List>
    )
}