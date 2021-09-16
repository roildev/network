import { useState } from "react"
import { NavLink } from "react-router-dom";

import postData from '../../services/postData.js'

const RegisterForm = (props) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [userRegistred, setUserRegistred] = useState(
        !!localStorage.getItem('userRegistred') ?
        JSON.parse(localStorage.getItem('userRegistred')) : false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            email: email,
            password: password,
            confirmation: confirmation,
        }

        postData('http://127.0.0.1:8000/core/register/', data)
            .then(json => {
                console.log('json', json)
                console.log('json.length', Object.entries(json).length)
                if (Object.entries(json).length > 0) {
                    if (json.token) {
                        console.log(json)
                        setUserRegistred(true)
                        localStorage.setItem('userRegistred', JSON.stringify(true))
                        props.handleErrors([])
                    } else {
                        let allErrors = []
                        for (let key in json) {
                            allErrors = [...allErrors, ...json[key]]
                        }
                        props.handleErrors(allErrors)
                        // setErrors(allErrors)
                    }
                }
            })
    }

    return (
        <>
            {!userRegistred ?
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
                :
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Congratulations!</h5>
                        <p className="card-text">You have been successfully registered. Follow the link to enter your account</p>
                        <NavLink to="/login" className="btn btn-primary">Log In</NavLink>
                    </div>
                </div>
            }
        </>
    )
}

export default RegisterForm