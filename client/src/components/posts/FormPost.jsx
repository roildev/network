import { useState } from 'react'

import postData from '../../services/postData.js'
import config from '../../config.js'

const FormPost = (props) => {
    console.log('RENDER FORM POST')
    const [postText, setPostText] = useState('')
    const userData = JSON.parse(localStorage.getItem('userData'))

    const handleTextPost = (e) => {
        setPostText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            body: postText
        }
        postData(`${config.base_url}/core/post-create/`, data, userData.token)
        .then((response) => {
            if (response) {
                setPostText('')
                props.handlePostSubmited(response)
            }
        })
    }

    return (
        <div className="form__wrapper col-md-7 offset-2">
            <form onSubmit={handleSubmit} >
                <div className="col-md-12" style={{padding: '0'}}>
                    <textarea value={postText} onChange={handleTextPost} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="col-12 form__control">
                    <button type="submit" className="btn btn-outline-dark">Add Post</button>
                </div>
            </form>
        </div>
    )
}

export default FormPost