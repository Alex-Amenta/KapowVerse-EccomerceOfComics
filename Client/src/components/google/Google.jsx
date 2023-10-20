import { GoogleLogin } from 'react-google-login';

function LoginComponent() {
    const responseGoogle = (response) => {
        // Envía el token de acceso al servidor para validarlo y obtener información del usuario
        console.log(response.tokenId);
    };

    return (
        <GoogleLogin
            clientId="TU_CLIENT_ID"
            buttonText="Iniciar sesión con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    );
}