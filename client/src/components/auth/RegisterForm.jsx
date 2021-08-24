import { useState } from "react"

import postData from '../../services/postData.js'

const RegisterForm = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            email: email,
            password: password,
            confirmation: confirmation,
        }

        postData('http://127.0.0.1:8000/core/register/', data)
        .then((response) => {
            if (!!response.token) {
                localStorage.setItem('userData', JSON.stringify(response))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username</label>
                <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordConfirmInput" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="passwordConfirmInput" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default RegisterForm