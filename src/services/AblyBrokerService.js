import * as ably from 'ably';
import Cookies from 'js-cookie'

// dados da conexao com o servidor
const client = {
    "userToken": -1,
    "connection": null,
    "channel": null,
    "topics": {}
}

// inicia conexão do cliente ably com o servidor
const init = () => {
    // local API f3tY9A.5_05yA:RGdvuS_TneYKSUG5
    client.connection = ably.Realtime({'key':'b75WYw.5VOWVQ:zxct1AniXY80WGpd'});
    client.connection.connection.on('connected', ()=>console.log('Connected to Server'));
    client.connection.connection.on('disconnected', ()=> console.log('Conection Closed'))
    client.connection.connection.on('failed', ()=>console.log('Failed to Connect to Server'));
}

const watchRooms = (callback)=>{
    if (client.connection) {
        // cria topicos das salas e se inscreve no topico salas abertas
        client.topics.rooms = client.connection.channels.get("/rooms", {params:{rewind:'1'}});
        client.topics.rooms.subscribe(message => callback(message));
    }else{
        console.log('timeout');
        setTimeout(() => watchRooms(callback), 500);
    }
}

const watchCanvas = (roomId, callback) => {
    if(client.connection){
        client.topics.canvas = client.connection.channels.get(`/rooms/${roomId}/canvas`, {params:{rewind:'1'}});
        client.topics.canvas.subscribe(message => callback(message));
    }
}

const streamCanvas = (content, roomId) =>{
    if(client.connection) {
        client.topics.canvas = client.connection.channels.get(`/rooms/${roomId}/canvas`);
        client.topics.canvas.publish(content);
    }
}

export {client, init, watchRooms};
