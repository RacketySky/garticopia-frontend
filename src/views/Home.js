import {
    Heading,
    Pane, 
    Switch, 
    TextInputField,
    Text,
    Checkbox,
    Combobox,
    SelectField,
    Button,
    PlusIcon
} from 'evergreen-ui'
import { useState } from 'react';
import { RoomCardComponent } from '../components/RoomCard';

const HomeView = (props)=>{
    const [priv, setPriv] = useState(false);
     const rooms = [
        {name:"Sala 1", capacity:10, ocupation:10, category:"animais"},
        {name:"Sala 2", capacity:10, ocupation:0, category:"estados"},
        {name:"Sala 3", capacity:10, ocupation:5, category:"esportes"},
    ];

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