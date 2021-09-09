import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import FormPost from '../components/posts/FormPost'
import Posts from '../components/posts/Posts'

const ProfilePage = (props) => {    
    const query = new URLSearchParams(useLocation().search) 
    const username = query.get('username')
    const userId = query.get('user_id')

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="item">
                        <img className="item__logo" src="https://smen.es/wp-content/uploads/2020/04/barba-pistolero-600x738.png" alt="profile_logo" height="128" width="128" />
                        <h3 className="item__title">{username.charAt(0).toUpperCase() + username.slice(1)}</h3>
                    </div>
                    <Posts by={userId} userData={props.userData}/>
                </div>
            </div>
        </>
    )
}

export default ProfilePage