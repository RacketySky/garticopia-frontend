import {
    TextInputField,
    Button, 
    Pane,
    toaster,
    TickIcon
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