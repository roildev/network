import LoginForm from '../auth/LoginForm'

const LoginPage = (props) => {
    const handleAuth = props.handleAuth
    return (
        <LoginForm  handleAuth={handleAuth}/>
    )
}

export default LoginPage