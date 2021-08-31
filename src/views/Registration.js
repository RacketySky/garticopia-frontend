import {
    TextInputField,
    Button, 
    Pane,
    toaster,
    TickIcon
} from 'evergreen-ui'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

import {
    UserService
} from '../services/Api'

const RegistrationView = (props)=>{
    const h = useHistory();

    const registration = (e)=>{
        e.preventDefault();
        var data = new FormData(e.target);
        var user = {
            userName:data.get("name"),
            userEmail:data.get("email"),
            userPassword:data.get("password"),
        }
        
        if(user.userPassword !== data.get("password-conf")) return toaster.danger("As senhas informadas não batem.");

        UserService.register(user).then(res=>{
            Cookies.set('token', res.data.userToken);
            toaster.success('Sucesso!');
            h.push('/home');
        })
        .catch(err =>{
            toaster.danger(err.toString());
        });
    }

    return (
        <Pane paddingX="40em" paddingTop="20px">
            <h1 className="logo" style={{fontSize: '86px'}}><span className="logo-blue">G</span>arti<span className="logo-blue">cópia</span></h1>
            <form onSubmit={registration} style={{backgroundColor:"white", padding:'2em', borderRadius:'5px'}}>
                <TextInputField name="name" type="text" label="Nome" placeholder="Antônio Antoniel"/>
                <TextInputField name="email" type="email" label="Email" placeholder="exemplo@email.com"/>
                <TextInputField name="password" type="password" label="Senha" placeholder="**********"/>
                <TextInputField name="password-conf" type="password" label="Confirmação de Senha" placeholder="**********"/>
                <Button
                    width="100%"
                    iconAfter={TickIcon}
                    height={40}
                    appearance="primary">
                    Confirmar
                </Button>
            </form>
        </Pane>
    );
}

export {RegistrationView};