import {
    Heading,
    Small, 
    Text,
    PeopleIcon,
    Card,
    Pane,
    Button,
    ArrowRightIcon
} from 'evergreen-ui'

const RoomCardComponent = (props)=>{
    var room = props.room;
    return (
        <Card elevation={1} paddingX="2em" paddingY="1em" display="flex" flexDirection="row" justifyContent="space-between" marginX = {props.marginX} marginY={props.marginY}>
            <Pane>
                <Heading>{room.name}</Heading>
                <Text>{room.category}</Text>
                <Text>
                    <PeopleIcon/> <Small>{room.ocupation} / {room.capacity}</Small>
                </Text>
            </Pane>
            <Pane>
                <Button iconAfter={ArrowRightIcon} appearance="primary" intent="success">Entrar</Button>
            </Pane>
        </Card>
    );
}

export {RoomCardComponent};