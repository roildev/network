import { useState } from "react"
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'

import postData from '../../services/postData.js'
import config from '../../config.js'

const LoginForm = (props) => {
    console.log('RENDER LOGIN')
    const handleAuth = props.handleAuth
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
        }
        postData(`${config.base_url}/token-auth/`, data)
        .then((response) => {
            console.log(response)
            if (!!response.token) {
                login(response)
            }
        })
    }

    const login = (user) => {
        handleAuth(user)
        setRedirect(true)
        if (!!localStorage.getItem('userRegistred')) {
            localStorage.removeItem('userRegistred')
        } 
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username</label>
                <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <div className="mt-3">Don't have an account? <Link to="/registration">Register here.</Link></div>
        </form>
    )
}

export default LoginForm