import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import FormPost from '../components/posts/FormPost'
import Posts from '../components/posts/Posts'
import Followers from '../components/followers/Followers'

const ProfilePage = (props) => { 
    console.log('RENDER PROFILE PAGE')
    const pathname = useLocation().pathname.split('/')
    const [userId, setUserId] = useState(pathname[pathname.length - 1])
    const query = new URLSearchParams(useLocation().search) 
    const [username, setUsername] = useState(query.get('username'))
    console.log('pathname: ', pathname, 'username:', username, 'userId: ', userId)

    if (+userId !== +pathname[pathname.length - 1]) {
        setUserId(pathname[pathname.length - 1])
        setUsername(query.get('username'))
    }

    return (
        <div className="container">
            <div className="row">
            <div className="col-md-3">
                <p className="fs-4">Followers</p>
                <Followers userData={props.userData} by={userId} />
            </div>
            <div className="col-md-8">
                <div className="item">
                    <img className="item__logo" src="https://smen.es/wp-content/uploads/2020/04/barba-pistolero-600x738.png" alt="profile_logo" height="128" width="128" />
                    <p className="fs-3 item__title">{username.charAt(0).toUpperCase() + username.slice(1)}</p>
                </div>
                <div className="item">
                    <button type="button"
                        className={!!props.userSubscribed ? "btn btn-danger" : "btn btn-dark"}>
                        {!!props.userSubscribed ? "Unfollow" : "Follow"}    
                    </button>
                </div>
                <Posts by={userId} userData={props.userData}/>
            </div>
            <div className="col-md-1"><h1>Right Bar</h1></div>
            </div>
        </div>
    )
}

export default ProfilePage