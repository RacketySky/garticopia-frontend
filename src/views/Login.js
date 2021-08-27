import {
    TextInputField,
    Button, 
    Pane
} from 'evergreen-ui'

const LoginView = (props)=>{
    const login = (e)=>{
        e.preventDefault();
        var data = new FormData(e.target);
        var user = {
            email:data.get("email"),
            password:data.get("password")
        }

        //enviar o user via AMQP para tentar realizar login
    }

    return (
        <Pane paddingX="40em" paddingY="20em">
            <form onSubmit={login}>
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