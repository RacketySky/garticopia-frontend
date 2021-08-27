import {
    Pane,
} from 'evergreen-ui'
import { RoomCardComponent } from '../components/RoomCard';

const HomeView = (props)=>{
     const rooms = [
        {name:"Sala 1", capacity:10, ocupation:10, category:"animais"},
        {name:"Sala 2", capacity:10, ocupation:0, category:"estados"},
        {name:"Sala 3", capacity:10, ocupation:5, category:"esportes"},
    ];

    return (
        <Pane paddingX="40em" paddingY="15em">
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