import * as mqtt from 'mqtt';
import * as ably from 'ably';

const login = ()=>{
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
    const client = ably.Realtime({'key':'b75WYw.5VOWVQ:zxct1AniXY80WGpd'});

    client.connection.on('connected', ()=>console.log('connected2'));
    client.connection.on('failed', ()=>console.log('failed to connect'));

    const channel = client.channels.get('user');
    channel.publish('my_topic', Buffer('my_message'), (err)=>console.log(err));
    
}

export {login};