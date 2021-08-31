import {
    getOpenRooms
} from '../services/AblyBrokerService';

import { useEffect } from 'react';

import {
    Heading,
    Pane, 
    TextInputField,
    SelectField,
    Button,
    PlusIcon,
    toaster
} from 'evergreen-ui';

import { RoomCardComponent } from '../components/RoomCard';
import { useState } from 'react';
import { RoomService } from '../services/Api';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

const HomeView = (props)=>{
    const [rooms, setRooms] = useState(null);
    const h = useHistory();

    const createRoom = (e)=>{
        e.preventDefault();
        var data = new FormData(e.target);
        var room = {
            userToken:Cookies.get('token'),
            roomName:data.get('create-room-name'),
            roomCategory:data.get('create-room-category')
        }
        
        RoomService.create(room).then(res=>{
            toaster.success("Entrando");
            h.push('/room', {roomID:res.data.roomID});
        })
        .catch(err =>{
            toaster.danger(err.toString());
        });
    }

    const enterRoom = (roomID) =>{
        RoomService.enter({'roomID':roomID, 'userToken':Cookies.get('token')}).then(res=>{
            toaster.success("Entrando");
            h.push('/room', {roomID:roomID});
        }).catch(err =>{
            toaster.danger(err.toString());
            console.log(err);
        });
    }
    // solicita salas abertas para o broker
    useEffect(()=>{
        if(rooms == null) {
            getOpenRooms((message)=>{
                var r = JSON.parse(message.data).rooms;
                console.log(r);
                setRooms(r);
            });
        }
    }, [rooms]);

    return (
        <Pane paddingX="40em" paddingTop = "20px">
            <h1 className="logo" style={{fontSize: '86px'}}>
                <span className="logo-blue">G</span>arti<span className="logo-blue">cópia</span>
            </h1>

            <Pane backgroundColor="white" borderRadius="5px" padding="1em">
                <form onSubmit={createRoom}>
                    <Heading textAlign="center" size={700}> Criar Sala</Heading>
                    <TextInputField name='create-room-name' label="Nome"/>
                    <SelectField label="Categoria" name='create-room-category' defaultValue="animais">
                        <option value="animais"> 
                            Animais
                        </option>
                        <option value="estados">
                            Estados
                        </option>
                        <option value="esportes">
                            Esportes
                        </option>
                    </SelectField>
                    <Button 
                        width="100%"
                        iconAfter={PlusIcon} 
                        appearance="primary" 
                        intent="success">
                        Criar Sala
                    </Button>
                </form>
            </Pane>

            {
                rooms?
                rooms.map(room => 
                {
                    return (
                        <RoomCardComponent 
                            key={room.roomID} 
                            room={room} 
                            marginY={"1em"} 
                            onEnter={enterRoom}/>
                    )
                })
                :<></>
            }
        </Pane>
    );
}

export {HomeView};