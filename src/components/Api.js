import * as mqtt from 'mqtt';
import * as ably from 'ably';


// dados da conexao com o servidor
var client = {
    "userToken": -1,
    "connection": null,
    "channel": null,
    "topics": {}
}

const login = ()=>{
    // conecta com o servidor e requisita o login

    // se o login for autenticado, estabelece conexao MQTT com o servidor
    client.userToken = 1;
    client.connection = ably.Realtime({'key':'b75WYw.5VOWVQ:zxct1AniXY80WGpd'});
    client.connection.connection.on('connected', ()=>console.log('Connected to Server'));
    client.connection.connection.on('failed', ()=>console.log('Failed to Connect to Server'));
    // cria topicos das salas e se inscreve no topico salas abertas
    client.topics.getRooms = client.connection.channels.get("getRooms");
    client.topics.openRooms = client.connection.channels.get("openRooms");
    // var decoder = new encoding.TextDecoder();
    // var options = {
    //     keepalive: 30,
    //     username: 'b75WYw.5VOWVQ', /* API key's name */
    //     password: 'zxct1AniXY80WGpd', /* API key's secret */
    //     port: 8883
    // };
    // var client = mqtt.connect('mqtts:mqtt.ably.io', options);
    // // client.on('packetsend', (p)=> console.log(p));
    // client.publish('my_channel', 'my_message', { qos: 0 });
    // console.log("aqui");
    
    // client.on('message', function(topic, message) {
    //     console.log(message);
    // });

    // client.subscribe('my_channel', function (err) {
    //     if (!err) {
    //     client.publish('my_channel', 'my_message', { qos: 0 });
    //     }
    // });
    
    //const client = ably.Realtime({'key':'b75WYw.5VOWVQ:zxct1AniXY80WGpd'});

    //client.connection.on('connected', ()=>console.log('connected2'));
    //client.connection.on('failed', ()=>console.log('failed to connect'));

    //const channel = client.channels.get('user');
    //channel.publish('my_topic', Buffer('my_message'), (err)=>console.log(err));
    
}

const getRooms = ()=>{
    if (client.connection) {
        var request = {
            "userToken": client.userToken
        }
        // publica requisicao no topico getRooms
        client.topics.getRooms.publish('GetRoomRequest', JSON.stringify(request), function(err) {
            if (err) {
                console.log('[ ERROR ] Could not publish getRooms request');
                console.log(err);   
            } else {
                console.log('[ INFO ] getRooms request published')
            }
        });
    }
}

export {client, login, getRooms};