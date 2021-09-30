import {
    Button,
    Card, CircleIcon, DotIcon, EraserIcon, Heading, IconButton, Pane, Popover, SquareIcon, SymbolSquareIcon, Text, TintIcon
} from 'evergreen-ui'

import { useEffect, useRef, useState } from 'react';
import { streamCanvas, watchCanvas } from '../services/AblyBrokerService';
import * as fastCompression from 'fastintcompression';
import * as LZUTF8 from 'lzutf8';
import {gzip, ungzip} from 'node-gzip';

const CanvasComponent = (props)=>{
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
        canvas.width = 640;
        canvas.height = 360;
        canvas.style.width = `${640}px`;
        canvas.style.height = `${360}px`;
        canvas.style.backgroundColor = "white";
        canvas.style.borderRadius = "3px"

        const context = canvas.getContext('2d');

        context.scale(1, 1);
        context.LineCap = "round";
        contextRef.current = context;

        if(!props.isDrawing){
            watchCanvas(props.roomId, (content)=>{

                var img = new Image;
                img.onload = function(){
                    context.drawImage(img,0,0); // Or at whatever offset you like
                };
                img.src = content;

                // descomprime(content)
                // let array = new Uint8ClampedArray();
                // let imageData = new ImageData(array, 720, 480)
                // context.putImageData(imageData, 0 , 0);
            });
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
            let data = canvasRef.current.toDataURL();
            streamCanvas(data);
            // let data = contextRef.current.getImageData(0, 0, 720, 480).data;
            // streamCanvas(data)
        }
    }


    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;

        if(mode == 'pen' || mode == 'eraser'){
            
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