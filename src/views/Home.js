import {
    login,
    getRooms,
    client
} from '../components/Api';

import * as mqtt from 'mqtt';

import { useState, useEffect } from 'react';

import {
    Heading,
    Pane, 
    TextInputField,
    SelectField,
    Button,
    PlusIcon
} from 'evergreen-ui'

import { RoomCardComponent } from '../components/RoomCard';

const HomeView = (props)=>{
    // const [client, setClient] = useState(null);

    // const mqttConnect = (host, mqttOption) => {
    //     setClient(mqtt.connect(host, mqttOption));
    // };

    // useEffect(() => {
    //     if (client) {
    //         console.log(client)
    //         client.on('connect', () => {
            
    //         });
    //         client.on('error', (err) => {
    //             console.error('Connection error: ', err);
    //             client.end();
    //         });
            
    //         client.on('reconnect', () => {
    //             console.log('reconnecting')
    //         });

    //         client.on('message', (topic, message) => {
    //             const payload = { topic, message: message.toString() };
    //             console.log(payload);
    //             // setPayload(payload);
    //         });
    //     }else{
    //         mqttConnect('mqtts:mqtt.ably.io',{
    //             protocol: 'mqtts',
    //             // clientId uniquely identifies client
    //             // choose any string you wish
    //             clientId: 'b0908853',
    //             username: 'b75WYw.5VOWVQ', /* API key's name */
    //             password: 'zxct1AniXY80WGpd', /* API key's secret */
    //             port: 8883
    //         });
    //     }
    // }, [client]);

    // const mqttSub = (subscription) => {
    //     if (client) {
    //         const { topic, qos } = subscription;
    //         client.subscribe(topic, { qos }, (error) => {
    //         if (error) {
    //             console.log('Subscribe to topics error', error)
    //             return
    //         }
    //         // setIsSub(true)
    //         });
    //     }
    // };

    // const mqttUnSub = (subscription) => {
    //     if (client) {
    //         const { topic } = subscription;
    //         client.unsubscribe(topic, error => {
    //         if (error) {
    //             console.log('Unsubscribe error', error)
    //             return
    //         }
    //         // setIsSub(false);
    //         });
    //     }
    // };

    // const mqttPublish = (context) => {
    //     if (client) {
    //         const { topic, qos, payload } = context;
    //         client.publish(topic, payload, { qos }, error => {
    //             if (error) {
    //                 console.log('Publish error: ', error);
    //             }
    //         });
    //     }
    // }

    // const mqttDisconnect = () => {
    //     if (client) {
    //         client.end(() => {
    //         // setConnectStatus('Connect');
    //         });
    //     }
    // }

    const send_message = () => {
        login();
    }

    const rooms = [
        {name:"Sala 1", capacity:10, ocupation:10, category:"animais"},
        {name:"Sala 2", capacity:10, ocupation:0, category:"estados"},
        {name:"Sala 3", capacity:10, ocupation:5, category:"esportes"},
    ];

    useEffect(()=>{
        login();
        getRooms();
    })

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
                    onClick={send_message}
                    width="100%"
                    iconAfter={PlusIcon} 
                    appearance="primary" 
                    intent="success">
                    Criar Sala
                </Button>
            </Pane>

            {
                rooms.map(room => 
                {
                    return (
                        <RoomCardComponent room={room} marginY={"1em"}/>
                    )
                })
            }
        </Pane>
    );
}

export {HomeView};