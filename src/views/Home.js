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
    PlusIcon
} from 'evergreen-ui';

import { RoomCardComponent } from '../components/RoomCard';
import { useState } from 'react';

const HomeView = (props)=>{
    const [rooms, setRooms] = useState(null);

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
                <Heading textAlign="center" size={700}> Criar Sala</Heading>
                <TextInputField label="Nome"/>
                <SelectField label="Categoria">
                    <option value="animais" selected>
                        Animais
                    </option>
                    <option value="estados" selected>
                        Estados
                    </option>
                    <option value="esportes" selected>
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
            </Pane>

            {
                rooms?
                rooms.map(room => 
                {
                    return (
                        <RoomCardComponent room={room} marginY={"1em"}/>
                    )
                })
                :<></>
            }
        </Pane>
    );
}

export {HomeView};