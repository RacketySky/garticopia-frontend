import {
    Button,
    Pane,
    LogOutIcon,
    toaster,
    TextInput
} from 'evergreen-ui'

import { client, getOpenRooms, sendChatMessage, unwatchCanvas, watchAnswers, watchRoomStatus } from '../services/AblyBrokerService';

import { PlayerCardComponent } from '../components/PlayerCard';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import '../index.css'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import UsersCard from '../components/UserCard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Input } from '@material-ui/core';

import {
    RoomService
} from '../services/Api'
import { CanvasComponent } from '../components/Canvas';

const RoomView = (props) => {    
    const [users, setUsers] = useState(props.location.state.roomStatus.players);
    const [drawer, setDrawer] = useState(undefined);
    const [data, setData] = useState(props.location.state.roomStatus);
    const [isDrawer, setIsDrawer] = useState(false);
    const [currentDraw, setCurrentDraw] = useState(undefined);
    const [playersHit, setPlayersHit] = useState([])
    const [statusGame, setStatusGame] = useState('')
    const [chat, setChat] = useState([]);
    const [msg, setMsg] = useState('')
    const [chute, setChute] = useState('')
    const [isD, setIsD] = useState(true)

    // dados da Sala
    const [roomState, setRoomState] = useState(props.location.state.roomStatus.stage);

    // console.log("Room State:");
    const roomID = props.location.state.roomStatus.ID;
    // const roomID = props.location.state.roomID;

    // dados do historico
    var h = useHistory();

    // subscribe to room status topic
    watchRoomStatus(roomID, data => {console.log(data); setData(data)});

    // subscribe to answers topic
    watchAnswers(roomID, chatReponse => setMsg(chatReponse))

    const exitRoom = () => {
        RoomService.exit({ 'roomID': roomID, userID: parseInt(Cookies.get('ID')) }).then(res => h.push('/home')).catch(err => console.log(err));
    }

    useEffect(() => {
        setUsers(data.players)
        setCurrentDraw(data.currentDrawing)
        stageGame(data)
    }, [data])

    useEffect(() => {
        hitPlayers(data, users)
        currentDranwer(data, users)
    }, [data, users])

    useEffect(() => {
        playerisDrawer(data)
    }, [data])

    useEffect(() => {
        addChat(msg, users)
    }, [msg, users])


    function addChat(msg, users) {
        // setChat(chat=>[...chat, msg])
        var vetaux = []
        if (chat.length > 0 && msg !== undefined && msg !== '') {
            console.log('chamou a funcao')
            vetaux = chat
            console.log('msg' + msg)

            if (vetaux[vetaux.length - 1].userID === msg.userID && vetaux[vetaux.length - 1].guess === msg.guess) {
                console.log('msg ja adicionada')
            } else {
                if (vetaux.length > 15) {
                    vetaux.shift()
                    vetaux.push(msg)
                    setChat(vetaux)
                } else {
                    vetaux.push(msg)
                    setChat(vetaux)
                }
            }

        } else {
            if (msg !== undefined && msg !== '') {
                vetaux.push(msg)
                setChat(vetaux)
                // console.log(chat)
            }
        }
    }

    function verificaTamanho(vet) {
        if (vet.length > 0) {
            return true
        } else {
            return false
        }
    }

    //mostra os status da partida
    function stageGame(data) {
        const stagegame = data.stage
        if (stagegame !== undefined && statusGame !== stagegame) {
            setStatusGame(stagegame)
            if (stagegame === 'drawing')
                setIsD(false)
            else
                setIsD(true)
            toaster.success('Estado do jogo: ' + stagegame);
        }
    }

    const startRoom = (e) => {
        e.preventDefault();
        var room = {
            roomID: roomID,
            userID: parseInt(Cookies.get('ID')),
        }
        RoomService.start(room).then(res => {
            // console.log(res.message)
            toaster.success("Iniciado o Jogo");
        })
            .catch(err => {
                toaster.danger(err.toString());
            });
    }

    //verifica se o player é o desenhista
    function playerisDrawer(data) {
        let playerdrawer = data.currentDrawer
        if (playerdrawer !== undefined) {
            if (parseInt(Cookies.get('ID')) === playerdrawer) {
                setIsDrawer(true);
                unwatchCanvas(props.roomId);
            }else{
                setIsDrawer(false);
            }
        }
    }

    //pega um novo desenhista
    function currentDranwer(data, players) {
        // console.log('elegendo novo desenhista')
        const playerid = data.currentDrawer
        if (playerid >= 0 && players !== undefined) {
            for (var i = 0; i < players.length; i++)
                if (players[i].ID === playerid) {
                    setDrawer(players[i])
                }
        }
    }


    function hitPlayers(data, players) {
        // console.log('verificando se alguem acertou')
        const hit = data.alreadyGuessed
        if (hit !== undefined && players !== undefined) {
            for (var i = 0; i < players.length; i++) {
                for (var j = 0; j < hit.length; j++) {
                    if (players[i].ID === hit[j].ID) {
                        const p = players[i]
                        setPlayersHit(playersHit => [...playersHit, p.ID])
                        console.log(players[i] + 'acertou')
                    }
                }
            }
        }
    }
    // const drawer = props.location.state.roomStatus.currentDrawing


    const useStyles = makeStyles((theme) => ({
        boxUsers: {
            backgroundColor: 'white',
        }

    }));

    const onFormSubmit = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendChatMessage(roomID,JSON.stringify({ 'userID': parseInt(Cookies.get('ID')), 'guess': chute }), function (err) {
                if (err) {
                    console.log('[ ERROR ] erro ao publicar chute');
                    console.log(err);
                } else {
                    console.log('[ INFO ] chute publicado')
                    console.log(parseInt(Cookies.get('ID')));
                    setChute('')
                }
            });
            
        }
    }
    const handleChange = (event) => {
        event.preventDefault()
        setChute(event.target.value);
    };

    // console.log(currentDraw)

    const classes = useStyles();

    return (
        <Pane>
        {
            isDrawer? 
                //desenhista
                (
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        xs={12}
                        spacing={1}
                    >
                        <Grid item xs={12}>
                            <h1 className="logo" style={{ fontSize: '76px' }}><span className="logo-blue">G</span>arti<span className="logo-blue">cópia</span></h1>
                        </Grid>

                        <Grid item xs={12}

                            style={{ fontSize: '20px' }}
                        >
                            <Box style={{ background: 'white', width: '80px', textAlign: 'center', borderRadius: '8px' }}><AccessTimeIcon style={{ fontSize: 20, verticalAlign: 'baseline' }}></AccessTimeIcon>05:03</Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{ fontSize: 20, background: 'white', width: '300px', textAlign: 'center', borderRadius: '8px' }}>{currentDraw}</Box>
                        </Grid>

                        <Grid container
                            direction="row"
                            justifyContent="center"
                            xs={12}
                            spacing={0}
                        >
                            <Grid item xs={3} className={classes.boxUsers}>
                                <UsersCard Users={users} drawer={drawer} PlayersHit={playersHit}></UsersCard>
                            </Grid>
                            <Grid item xs={6}>

                                <CanvasComponent  isDrawing={isDrawer} roomId = {roomID} stage = {data.stage}/> <br></br>
                                <Grid className="chat">
                                    <Grid style={{ width: '768px' }} borderRadius='4px' className="chatHistory">
                                        {/* {chat.map(item => <p key={item}>{item}</p>)} */}
                                        {
                                            chat ?
                                                chat.map((msg, index) => {
                                                    return (
                                                        <p key={index}><spam>{msg.userID}: </spam>{msg.info}</p>
                                                    )
                                                })
                                                : <></>
                                        }
                                    </Grid>
                                    <Grid style={{ width: '768px' }}>
                                        <Pane is='form'>
                                            <TextInput disabled width='100%' name="chat" placeholder="Você agora é o Desenhista"  />
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
                )
            : 
            //outros jogadores
            (
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

                    <Grid item xs={12}

                        style={{ fontSize: '20px' }}
                    >
                        <Box style={{ background: 'white', width: '80px', textAlign: 'center', borderRadius: '8px' }}><AccessTimeIcon style={{ fontSize: 20, verticalAlign: 'baseline' }}></AccessTimeIcon>05:03</Box>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>

                    <Grid container
                        direction="row"
                        justifyContent="center"
                        // alignItems="center"
                        xs={12}
                        spacing={0}
                    >
                        <Grid item xs={3} className={classes.boxUsers}>
                            <UsersCard Users={users} drawer={drawer}></UsersCard>
                        </Grid>
                        <Grid item xs={6}>

                            <CanvasComponent  isDrawing={isDrawer} roomId = {roomID} stage = {data.stage}/>
                            <Grid className="chat">
                                <Grid style={{ width: '768px' }} borderRadius='4px' className="chatHistory">
                                    {
                                        verificaTamanho(chat) ?
                                            chat.map((msg, index) => {
                                                return (
                                                    <p key={index}><spam>{msg.userID}: </spam>{msg.info}</p>
                                                )
                                            })
                                            : <></>
                                    }
                                </Grid>
                                <Grid style={{ width: '768px' }}>
                                    {/* <Pane is='form' >
                                        <TextInput width='100%' name="chat" onKeyDown={onFormSubmit} placeholder="Escreva aqui uma resposta" onChange={e => setValue(e.target.value)} value={value} />
                                    </Pane> */}
                                    <Pane is='form'>
                                        <TextInput disabled={isD} width='100%' name="chat" onKeyDown={onFormSubmit} placeholder="Escreva aqui uma resposta" onChange={e => setChute(e.target.value)} value={chute} />
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
                        <Button
                            onClick={startRoom}
                            intent="danger"
                            appearance="primary"
                            iconAfter={LogOutIcon}>
                            Começar jogo
                        </Button>
                    </Grid>
                </Grid>
            )
        
        }
        </Pane>);
}

export { RoomView };