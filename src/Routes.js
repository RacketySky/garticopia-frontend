import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { HomeView } from './views/Home';
import { LoginView } from './views/Login';
import { RegistrationView } from './views/Registration';

const RoutesView = (props)=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginView}/>
                <Route exact path="/cadastro" component={RegistrationView}/>
                <Route exact path="/home" component={HomeView}/>
            </Switch>
        </BrowserRouter>
    );
}

export {RoutesView};