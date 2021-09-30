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
        if(!client.topics.rooms){
            client.topics.rooms = client.connection.channels.get("/rooms", {params:{rewind:'1'}});
        }
        client.topics.rooms.unsubscribe();
        client.topics.rooms.subscribe(message => callback(message));
    }else{
        console.log('timeout');
        setTimeout(() => watchRooms(callback), 500);
    }
}

const watchCanvas = (roomId, callback) => {
    if(client.connection){
        if(!client.topics.canvas){
            client.topics.canvas = client.connection.channels.get(`/rooms/${roomId}/canvas`);
        }
        client.topics.canvas.unsubscribe();
        client.topics.canvas.subscribe(message => {console.log(message); callback(JSON.parse(message.data))});
    }else{
        console.log('timeout');
        setTimeout(() => watchCanvas(roomId, callback), 500);
    }
}

const unwatchCanvas = (roomId) => {
    if(client.connection){
        if(!client.topics.canvas){
            client.topics.canvas = client.connection.channels.get(`/rooms/${roomId}/canvas`);
        }
        client.topics.canvas.unsubscribe();
    }else{
        console.log('timeout');
        setTimeout(() => unwatchCanvas(roomId), 500);
    }
}

const streamCanvas = (content, roomId) =>{
    if(client.connection){
        if(!client.topics.canvas) {
            client.topics.canvas = client.connection.channels.get(`/rooms/${roomId}/canvas`);
        }
        client.topics.canvas.publish('canvas', JSON.stringify(content), (err) => {if (err){console.error('ta dando erro' + err.toString())}});
    }else{
        console.log('timeout');
        setTimeout(() => streamCanvas(content, roomId), 500);
    }
}

const watchRoomStatus = (roomId, callback) => {
    if(client.connection){
        if(!client.topics.roomStatus){
            client.topics.roomStatus = client.connection.channels.get("/rooms/" + roomId);
        }
        client.topics.roomStatus.unsubscribe();
        client.topics.roomStatus.subscribe(roomId, message => callback(JSON.parse(message.data)));
    }else{
        console.log('timeout');
        setTimeout(() => watchRoomStatus(roomId, callback), 500);
    }
}

const watchAnswers = (roomId, callback) =>{
    if(client.connection){
        if(!client.topics.answers){
            client.topics.answers = client.connection.channels.get("/rooms/" + roomId + "/answers");
        }
        client.topics.answers.unsubscribe();
        client.topics.answers.subscribe(roomId, message => callback(JSON.parse(message.data)));
    }
    else{
        console.log('timeout');
        setTimeout(() => watchAnswers(roomId, callback), 500);
    }
}

const sendChatMessage = (roomId, message, errorCallback) => {
    if(client.connection){
        if(!client.topics.chat){
            client.topics.chat = client.connection.channels.get("/rooms/" + roomId + "/chat");
        }
        client.topics.chat.publish('', JSON.stringify(message), error => errorCallback(error))
        
    }else{
        console.log('timeout');
        setTimeout(() => sendChatMessage(roomId, message,  errorCallback), 500);
    }
}

export {
    client,
    init,
    watchRooms,
    watchCanvas,
    streamCanvas,
    watchAnswers,
    watchRoomStatus,
    sendChatMessage,
    unwatchCanvas
};
