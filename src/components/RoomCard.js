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
                <Heading>{room.name}</Heading>
                <br/>
                <Pane width="22%" display="flex" justifyContent="space-between">
                    <Text className={room.ocupation == room.capacity ? "danger-red": ""}>
                        <PeopleIcon/> <Small>{room.ocupation} </Small>
                    </Text>

                    <Text>
                        <TagIcon></TagIcon> {room.category}
                    </Text>
                </Pane>
            </Pane>
            <Pane>
                <Button 
                    disabled={room.ocupation === room.capacity}
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