import * as ably from 'ably';

// dados da conexao com o servidor
const client = {
    "userToken": -1,
    "connection": null,
    "channel": null,
    "topics": {}
}

// inicia conexão do cliente ably com o servidor
const init = () => {
    client.connection = ably.Realtime({'key':'b75WYw.5VOWVQ:zxct1AniXY80WGpd'});
    client.connection.connection.on('connected', ()=>console.log('Connected to Server'));
    client.connection.connection.on('disconnected', ()=> console.log('Conection Closed'))
    client.connection.connection.on('failed', ()=>console.log('Failed to Connect to Server'));
}

const getOpenRooms = (callback)=>{
    if (client.connection) {
        // cria topicos das salas e se inscreve no topico salas abertas
        client.topics.getRooms = client.connection.channels.get("getRooms");
        client.topics.openRooms = client.connection.channels.get("openRooms");

        var request = {
            "userToken": 1
        }
        //começa a ouvir o topico openRooms
        client.topics.openRooms.subscribe('Open Rooms', (message) => callback(message));

        // publica requisicao no topico getRooms
        client.topics.getRooms.publish('GetRoomRequest', JSON.stringify(request), function(err) {
            if (err) {
                console.log('[ ERROR ] Could not publish getRooms request');
                console.log(err);   
            } else {
                console.log('[ INFO ] getRooms request published')
            }
        });
    }else{
        console.log('timeout');
        setTimeout(() => getOpenRooms(callback), 500);
    }
}

export {client, init, getOpenRooms};