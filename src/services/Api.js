import axios from 'axios';
import Cookies from 'js-cookie';

//'http://localhost:3333'

const instance = axios.create({
    baseURL: 'https://garticopia-backend.herokuapp.com/',
});

const options = (params = {})=>{
    let token = Cookies.get("token");
    return {
        headers:{
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": token ? "Bearer " + token : ""
        },
        params:params
    }
}

export class UserService{
    static login(user){
        return instance.post(`/auth`, user, options());
    }

    static register(user){
        return instance.post(`/register`, user, options());
    }
}

export class RoomService {
    static create(room) {
        return instance.post(`room/createroom`, room, options());
    }

    static exit(room){
        return instance.post('room/exitroom', room, options());
    }

    static enter(room){
        return instance.post('room/enterroom', room, options());
    }

    static start(room){
        return instance.post('/room/startroom',room,options())
    }
}