import {
    Button,
    Pane,
    LogOutIcon,
    BlankIcon,
    TextInput
} from 'evergreen-ui'

import { client } from '../services/AblyBrokerService';

import { PlayerCardComponent } from '../components/PlayerCard';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import '../index.css'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import UsersCard from '../components/UserCard';

import {
    RoomService
} from '../services/Api'
import { CanvasComponent } from '../components/Canvas';

const RoomView = (props) => {
    // dados da Sala
    const [roomState, setRoomState] = useState(props.location.state.roomStatus);
    console.log("Room State:");
    console.log(props.location.state.roomStatus);
    const roomID = props.location.state.roomID;
    console.log("Room ID");
    console.log(roomID);
    // dados do historico
    var h = useHistory();

    // subscribe to room status topic
    client.topics.roomStatus = client.connection.channels.get("/rooms/" + roomID);
    client.topics.roomStatus.subscribe("" + roomID, (message) => {
        // obtem JSON da mensagem
        var data = JSON.parse(message.data);
        // atualiza o status da Sala
        console.log("Room Status Received");
        console.log(data);
        setRoomState(data.roomStatus);

    });

    const exitRoom = () => {

        // RoomService.exit({'roomID':roomID, userToken:Cookies.get('token')}).then(res=> h.push('/home')).catch(err => console.log(err));
    }


    

    const Drawner = { name: 'user 11', score: 10 }
    const users = [
        { name: 'user1', score: 3, hit: true },
        { name: 'user2', score: 5 },
        { name: 'user3', score: 7, hit: true },
        { name: 'user4', score: 10 },
        { name: 'user5', score: 9, hit: true },
        { name: 'user6', score: 8 },
        { name: 'user7', score: 1 },
        { name: 'user8', score: 0, hit: true },
        { name: 'user9', score: 0 },
        { name: 'user10', score: 0 }
    ]

    const useStyles = makeStyles((theme) => ({
        boxUsers: {
            backgroundColor: 'white',
        }

    }));

    const [chat, setChat] = useState([]);
    const [value, setValue] = useState('')
    const onFormSubmit = (e) => {
        e.preventDefault();
        setChat(chat => [...chat, value])
    }

    const chatChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
            spacing={1}
        >
            <Grid item xs={12}>
                <h1 className="logo" style={{ fontSize: '86px' }}><span className="logo-blue">G</span>arti<span className="logo-blue">cópia</span></h1>
            </Grid>

            <Grid container
                direction="row"
                justifyContent="center"
                // alignItems="center"
                xs={12}
                spacing={0}
            >
                <Grid item xs={3} className={classes.boxUsers}>
                    <UsersCard Users={users} Drawner={Drawner}></UsersCard>
                </Grid>
                <Grid item xs={6}>
                    <CanvasComponent/>
                    <br/>
                    <Grid className="chat">
                        <Grid style={{ width: '768px' }} borderRadius='4px' className="chatHistory">
                            {chat.map(item => <p key={item}>{item}</p>)}
                        </Grid>
                        <Grid style={{ width: '768px' }}>
                            <Pane is='form' onSubmit={onFormSubmit}>
                                <TextInput width='100%' name="chat" placeholder="Escreva aqui uma resposta" onChange={chatChange} />
                            </Pane>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid>
                <Button
                    onClick={exitRoom}
                    intent="danger"
                    appearance="primary"
                    iconAfter={LogOutIcon}>
                    Sair da Sala
                </Button>
            </Grid>
        </Grid>
    );
}

export { RoomView };