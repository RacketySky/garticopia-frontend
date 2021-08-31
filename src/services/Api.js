import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'https://garticopia-backend.herokuapp.com/',
});

const options = (params = {})=>{
    let token = Cookies.get("authToken");
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
        return instance.post(`/createroom`, room, options());
    }

    static exit(room){
        return instance.post('/exitroom', room, options());
    }

    static enter(room){
        return instance.post('/enterroom', room, options());
    }
}