import {
    Heading,
    Small, 
    Text,
    PeopleIcon,
    Card,
    Pane,
    Button,
    ArrowRightIcon,
    TagIcon
} from 'evergreen-ui'

const RoomCardComponent = (props)=>{
    var room = props.room;
    return (
        <Card
            key={room.roomID}
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
                <Heading>{room.roomName}</Heading>
                <br/>
                <Pane width="22%" display="flex" justifyContent="space-between">
                    <Text className={room.roomPlayers === 10 ? "danger-red": ""}>
                        <PeopleIcon/> <Small>{room.roomPlayers} </Small>
                    </Text>

                    <Text>
                        <TagIcon></TagIcon> {'categoria'}
                    </Text>
                </Pane>
            </Pane>
            <Pane>
                <Button 
                    onClick={()=>props.onEnter(room.roomID)}
                    disabled={room.ocupation === 10}
                    iconAfter={ArrowRightIcon} 
                    appearance="primary" 
                    intent="success">
                    Entrar
                </Button>
            </Pane>
        </Card>
    );
}

export {RoomCardComponent};