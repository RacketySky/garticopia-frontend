import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { HomeView } from './views/Home';
import { LoginView } from './views/Login';
import { RegistrationView } from './views/Registration';
import { RoomView } from './views/Room';
import { CanvasComponentTest } from './views/teste';

const RoutesView = (props)=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginView}/>
                <Route exact path="/cadastro" component={RegistrationView}/>
                <Route exact path="/home" component={HomeView}/>
                <Route exact path="/room" component={RoomView}/>
                <Route exact path="/teste" component={CanvasComponentTest}/>
            </Switch>
        </BrowserRouter>
    );
}

export {RoutesView};