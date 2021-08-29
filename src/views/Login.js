import {
    TextInputField,
    Button, 
    Pane,
    Heading,
    LogInIcon
} from 'evergreen-ui'

const LoginView = (props)=>{
    const login = (e)=>{
        e.preventDefault();
        var data = new FormData(e.target);
        var user = {
            email:data.get("email"),
            password:data.get("password")
        }
    }

    return (
        <Pane paddingX="40em" paddingTop="30px">
            <h1 className="logo" style={{fontSize: '86px'}}><span className="logo-blue">G</span>arti<span className="logo-blue">cópia</span></h1>
            <form onSubmit={login} style={{backgroundColor:"white", padding:'2em', borderRadius:'5px'}}>
                <Heading size={800}>Entre Para Jogar!</Heading>
                <br/>
                <TextInputField name="email" type="email" label="Email" placeholder="exemplo@email.com"/>
                <TextInputField name="password" type="password" label="Senha" placeholder="**********"/>
                <Button
                    width="100%"
                    iconAfter={LogInIcon}
                    height={40}
                    appearance="primary">
                    Login
                </Button>
            </form>
        </Pane>
    );
}

export {LoginView};