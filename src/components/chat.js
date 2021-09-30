import React from 'react';
import { Grid } from '@material-ui/core';

export default function Chat(props) {
    return (
        <Grid style={{ width: '768px' }} borderRadius='4px' className="chatHistory">
            {
                props.chat ?
                    props.chat.map((msg, index) => {
                        return (
                            <p key={index}>{msg}</p>
                        )
                    })
                    : <></>
            }
        </Grid>
    )
}