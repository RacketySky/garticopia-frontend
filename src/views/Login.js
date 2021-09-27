import {
    TextInputField,
    Button, 
    Pane,
    Heading,
    LogInIcon,
    toaster,
    PlusIcon
} from 'evergreen-ui'
import { useHistory } from 'react-router';
import { UserService } from '../services/Api';
import Cookies from 'js-cookie';

const LoginView = (props)=>{
    const h = useHistory();
    const login = (e)=>{
        e.preventDefault();

        var data = new FormData(e.target);
        var user = {
            userEmail:data.get("email"),
            userPassword:data.get("password")
        }

        UserService.login(user).then(res=>{
            Cookies.set('token', res.data.userToken);
            Cookies.set('ID', res.data.userID);
            Cookies.set('Username', res.data.userName);
            toaster.success('Sucesso!');
            h.push('/home');
        }).catch(err => {   
            toaster.danger(err.toString());
            console.log(err);
        });
    }

    return (
        <Pane paddingX="25em" paddingTop="30px">
            <h1 className="logo" style={{fontSize: '86px'}}><span className="logo-blue">G</span>arti<span className="logo-blue">cópia</span></h1>
            <form onSubmit={login} style={{backgroundColor:"white", padding:'2em', borderRadius:'5px'}}>
                <Heading size={800}>Entre Para Jogar!</Heading>
                <br/>
                <TextInputField name="email" type="email" label="Email" placeholder="exemplo@email.com"/>
                <TextInputField name="password" type="password" label="Senha" placeholder="**********"/>
                <Button
                    type="submit"
                    width="100%"
                    iconAfter={LogInIcon}
                    height={40}
                    appearance="primary">
                    Login
                </Button>
                
                <Button
                    type="button"
                    marginTop={"1em"}
                    onClick={()=>h.push('/cadastro')}
                    width="100%"
                    iconAfter={PlusIcon}
                    height={40}
                    appearance="primary">
                    Cadastro
                </Button>
            </form>
            
        </Pane>
    );
}

export {LoginView};