import {
    Heading,
    Small, 
    Text,
    Card,
    Pane,
    Button,
    TickCircleIcon,
    TagIcon
} from 'evergreen-ui'

const PlayerCardComponent = (props)=>{
    var player = props.player;
    return (
        <Card
            key={player.playerID}
            elevation={1}
            paddingX="2em"
            paddingY="1em"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            backgroundColor="white"
            boxShadow={"3px 3px 3px rgba(0,0,0,.5)"}
            marginX={props.marginX}
            marginY={props.marginY}>

            <Pane width="100%">
                <Heading>{player.playerName}</Heading>
                <br/>
                <Pane width="22%" display="flex" justifyContent="space-between" flexDirection="row">
                    <Text>
                        <TickCircleIcon/>
                    </Text>
                    <Text>
                        <Small>{player.playerPoints} </Small>
                    </Text>
                </Pane>
            </Pane>

        </Card>
    );
}

export {PlayerCardComponent};