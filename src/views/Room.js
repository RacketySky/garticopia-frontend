import {
    Button, 
    Pane,
    LogOutIcon,
    BlankIcon
} from 'evergreen-ui'
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import {
    RoomService
} from '../services/Api'

const RoomView = (props)=>{
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    // const roomID = props.location.state.roomID;
    var h = useHistory();

    const exitRoom = ()=>{

        // RoomService.exit({'roomID':roomID, userToken:Cookies.get('token')}).then(res=> h.push('/home')).catch(err => console.log(err));
    }

    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth/2}px`;
        canvas.style.height = `${window.innerHeight/2}px`;
        canvas.style.backgroundColor = "white";
        canvas.style.borderRadius = "3px"
        canvas.style.border = "2px dashed black";

        const context = canvas.getContext('2d');
        
        context.scale(2,2);
        context.LineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;

    }, []);

    const startDrawing = ({nativeEvent})=>{
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);

    }

    const finishDrawing = ()=>{
        contextRef.current.closePath();
        setIsDrawing(false);
    }


    const draw = ({nativeEvent}) =>{
        if(!isDrawing) return;
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke()
    }

    return (
        <Pane display="flex" flexDirection="column" paddingTop="20px" alignItems="center">
            <h1 className="logo" style={{fontSize: '86px'}}><span className="logo-blue">G</span>arti<span className="logo-blue">cópia</span></h1>

            <canvas 
                ref = {canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                />

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