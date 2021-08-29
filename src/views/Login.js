import {
    TextInputField,
    Button, 
    Pane,
    Heading
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
        <Pane paddingX="40em" paddingY="20em">
            <form onSubmit={login} style={{backgroundColor:"white", padding:'2em', borderRadius:'5px'}}>
                <Heading size={900} fontFamily={'Varela Round'}>Entre Para Jogar!</Heading>
                <br/>
                <TextInputField name="email" type="email" label="Email" placeholder="exemplo@email.com"/>
                <TextInputField name="password" type="password" label="Senha" placeholder="**********"/>
                <Button 
                    appearance="primary">
                    Login
                </Button>
            </form>
        </Pane>
    );
}

export {LoginView};