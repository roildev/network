import { useState } from 'react'

import RegisterForm from '../components/auth/RegisterForm.jsx'
import ErrorAlert from '../components/ErrorAlert' 

const RegisterPage = () => {
    const [errors, setErrors] = useState([])

    const handleErrors = (errors) => {
        setErrors(errors)
    }
    console.log(errors)

    if (errors.length > 0 ) {
        return (
            <>
                {errors.map((e, i) => <ErrorAlert key={i} error={e} />)}
                <RegisterForm handleErrors={handleErrors} />
            </>
        )
    }

    return (
        <RegisterForm handleErrors={handleErrors} />
    )
}

export default RegisterPage

