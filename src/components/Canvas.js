import {
    Button,
    Card, CircleIcon, DotIcon, EraserIcon, Heading, IconButton, Pane, Popover, SquareIcon, SymbolSquareIcon, Text, TintIcon
} from 'evergreen-ui'

import { useEffect, useRef, useState } from 'react';
import { streamCanvas, unwatchCanvas, watchCanvas } from '../services/AblyBrokerService';

const CanvasComponent = (props)=>{
    const [currentCanvasMessage, setCurrentCanvasMessage] = useState([]);
    const [strokeColor, setStrokeColor] = useState('#000');
    const [penSize, setPenSize] = useState(3);
    const [eraserSize, setEraserSize] = useState(6);
    const [mode, setMode] = useState('pen');

    // Dados do Canvas
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);


    /* canvas init */
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 1280;
        canvas.height = 720;
        canvas.style.width = `${1280 / 2}px`;
        canvas.style.height = `${720 / 2}px`;
        canvas.style.backgroundColor = "white";
        canvas.style.borderRadius = "3px"

        const context = canvas.getContext('2d');

        context.scale(2, 2);
        context.LineCap = "round";
        contextRef.current = context;

        if(!props.isDrawing){
            console.log('watching canvas');
            watchCanvas(props.roomId, (data)=>{
                /* Reconstruir modo Pen ou Eraser */
                if(mode == 'pen' || mode == 'eraser'){
                    mode == 'pen'? context.globalCompositeOperation="source-over": context.globalCompositeOperation="destination-out";
                    for (let i = 0; i < data.positions.length; i++){
                        let pos = data.positions[i];
                        if(i == 0){
                            context.moveTo(pos[0], pos[1]);
                            context.beginPath();
                        }else{
                            context.lineTo(pos[0], pos[1]);
                            context.stroke();
                        }
                    }
                    context.closePath()
                }
            });
        }else{
            console.log('not watching canvas')
        }
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        if(!props.isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;

        contextRef.current.strokeStyle = strokeColor;

        if(mode == 'circle'){
            contextRef.current.globalCompositeOperation="source-over";
            contextRef.current.lineWidth = 3;
            contextRef.current.beginPath();
            contextRef.current.arc(offsetX, offsetY, 50, 0, 2*Math.PI);
            contextRef.current.stroke();
        }

        if(mode == 'square'){
            contextRef.current.globalCompositeOperation="source-over";
            contextRef.current.lineWidth = 3;
            contextRef.current.beginPath();
            contextRef.current.rect(offsetX - 50, offsetY -50, 100, 100);
            contextRef.current.stroke();
        }

        if(mode == 'eraser') {
            contextRef.current.globalCompositeOperation = "destination-out";
            contextRef.current.lineWidth = eraserSize;
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
            setIsDrawing(true);            
        }
        
        if (mode == 'pen') {
            contextRef.current.globalCompositeOperation="source-over";
            contextRef.current.lineWidth = penSize;
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        }
    }

    const finishDrawing = () => {
        setIsDrawing(false);
        contextRef.current.closePath();
        if(props.isDrawing) {
            if(mode == 'pen'|| mode == 'eraser')
                if(currentCanvasMessage.length < 1) return;
            streamCanvas({'positions':currentCanvasMessage, 'color':strokeColor, 'mode':mode});
            setCurrentCanvasMessage([]);
        }
    }


    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;

        if(mode == 'pen' || mode == 'eraser'){
            let cm = [...currentCanvasMessage];
            cm.push([offsetX, offsetY]);
            setCurrentCanvasMessage(cm);
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke()
        }
    }

    return (
        <Card display='flex' padding= '1em'>
            {
                props.isDrawing?
                <Pane display='flex' flexDirection='column'>
                    <input type='color' onChange={(e)=> setStrokeColor(e.target.value)}/>
                    <Pane marginY='.2em'>
                        <Popover
                            onOpen={()=>setMode('pen')}
                            position='top'
                            content={
                                <Pane textAlign='center' display='flex' flexDirection='column'>
                                    <Text>{penSize}px</Text>
                                    <input
                                        defaultValue={penSize}
                                        type='range'
                                        min='1'
                                        max='10'
                                        step='1'
                                        list='tickmarks'
                                        onChange={(e)=>setPenSize(e.target.value)}/>

                                <datalist id="tickmarks">
                                        <option value="1" label='1'/>
                                        <option value="2"/>
                                        <option value="3"/>
                                        <option value="4"/>
                                        <option value="5" label="5"/>
                                        <option value="6"/>
                                        <option value="7"/>
                                        <option value="8"/>
                                        <option value="9"/>
                                        <option value="10" label="10"/>
                                    </datalist>
                                </Pane>
                            }
                            >
                            <IconButton
                            icon = {DotIcon}/> 
                        </Popover>
                        
                        <Popover
                            onOpen={()=>setMode('eraser')}
                            position='top'
                            content={
                                <Pane textAlign='center' display='flex' flexDirection='column'>
                                    <Text>{eraserSize}px</Text>
                                    <input
                                        defaultValue={eraserSize}
                                        type='range'
                                        min='3'
                                        max='15'
                                        step='1'
                                        list='tickmarkseraser'
                                        onChange={(e)=>setEraserSize(e.target.value)}/>

                                <datalist id="tickmarkseraser">
                                        
                                        <option value="3" label="3"/>
                                        <option value="4"/>
                                        <option value="5"/>
                                        <option value="6" label="6"/>
                                        <option value="7"/>
                                        <option value="8"/>
                                        <option value="9" label="9"/>
                                        <option value="10"/>
                                        <option value="11"/>
                                        <option value="12" label="12"/>
                                        <option value="13"/>
                                        <option value="14"/>
                                        <option value="15" label="15"/>
                                    </datalist>
                                </Pane>
                            }
                            >
                            <IconButton
                                icon = {EraserIcon}/> 
                        </Popover>
                    </Pane>
                    
                    <Pane>
                        <IconButton 
                            onClick={()=> setMode('square')}
                            icon = {SquareIcon}/> 
                    
                        <IconButton 
                            onClick={()=> setMode('circle')}
                            icon = {CircleIcon}/> 
                    </Pane>
                </Pane>
                :<></>
            }
            
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}/>
        </Card>
    );
}

export {CanvasComponent};