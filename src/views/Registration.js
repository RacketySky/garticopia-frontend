import {
    TextInputField,
    Button, 
    Pane,
    toaster
} from 'evergreen-ui'

const RegistrationView = (props)=>{

    const registration = (e)=>{
        e.preventDefault();
        var data = new FormData(e.target);
        var user = {
            name:data.get("name"),
            email:data.get("email"),
            password:data.get("password"),
        }

        if(user.password === data.get("password-conf")) return toaster.danger("As senhas informadas não batem.");

        //enviar o user via AMQP para tentar realizar cadastro
    }

    return (
        <Pane paddingX="40em" paddingY="15em">
            <form onSubmit={registration}>
                <TextInputField name="name" type="text" label="Nome" placeholder="Antônio Antoniel"/>
                <TextInputField name="email" type="email" label="Email" placeholder="exemplo@email.com"/>
                <TextInputField name="password" type="password" label="Senha" placeholder="**********"/>
                <TextInputField name="password-conf" type="password" label="Confirmação de Senha" placeholder="**********"/>
                <Button 
                    appearance="primary">
                    Login
                </Button>
            </form>
        </Pane>
    );
}

export {RegistrationView};