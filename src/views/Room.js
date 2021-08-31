import {
    Button, 
    Pane,
    LogOutIcon
} from 'evergreen-ui'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

import {
    RoomService
} from '../services/Api'

const RoomView = (props)=>{
    const roomID = props.location.state.roomID;
    var h = useHistory();

    const exitRoom = ()=>{

        RoomService.exit({'roomID':roomID, userToken:Cookies.get('token')}).then(res=> h.push('/home')).catch(err => console.log(err));
    }

    return (
        <Pane paddingX="40em" paddingTop="20px">
            <h1 className="logo" style={{fontSize: '86px'}}><span className="logo-blue">G</span>arti<span className="logo-blue">cópia</span></h1>
            <Button 
                onClick={exitRoom}
                intent="danger"
                appearance="primary"
                iconAfter={LogOutIcon}>
                Sair da Sala
                </Button>
        </Pane>
    );
}

export {RoomView};