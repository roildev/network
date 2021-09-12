import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Posts from '../components/posts/Posts'
import Followers from '../components/followers/Followers'
import ButtonFollow from '../components/followers/ButtonFollow'

import config from '../config'
import getData from '../services/getData'

const ProfilePage = (props) => { 
    console.log('RENDER PROFILE PAGE')
    const pathname = useLocation().pathname.split('/')
    const [userId, setUserId] = useState(pathname[pathname.length - 1])
    const query = new URLSearchParams(useLocation().search) 
    const [username, setUsername] = useState(query.get('username'))

    const [userSubscribed, setUserSubscribed] = useState(false)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [followersList, setFollowersList] = useState(null)
    const [url, setUrl] = useState(`${config.base_url}/core/followers/${props.by}`)
    const [token, setToken] = useState(!!props.userData ? props.userData.token : false)

    if (url !== `${config.base_url}/core/followers/${userId}`) {
        setUrl(`${config.base_url}/core/followers/${userId}`)
    }

    if (!!token && token !== props.userData.token) {
        setToken(props.userData.token)
    }

    useEffect(() => {
        getData(url, token)
        .then(
            (response) => {
                setIsLoaded(true);
                setFollowersList(response)
                if (followersList !== null) {
                    setUserSubscribed(followersList.some(follower => follower.follower_id === props.userData.user.id))
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [url, token])
    

    if (+userId !== +pathname[pathname.length - 1]) {
        setUserId(pathname[pathname.length - 1])
        setUsername(query.get('username'))
    }

    return (
        <div className="container">
            <div className="row">
            <div className="col-md-3">
                <p className="fs-4">Followers</p>
                <Followers isLoaded={isLoaded} followersList={followersList} error={error}/>
            </div>
            <div className="col-md-8">
                <div className="item">
                    <img className="item__logo" src="https://smen.es/wp-content/uploads/2020/04/barba-pistolero-600x738.png" alt="profile_logo" height="128" width="128" />
                    <p className="fs-3 item__title">{username.charAt(0).toUpperCase() + username.slice(1)}</p>
                </div>
                {!!props.userData && +props.userData.user.id !== +userId ?
                    <div className="item">
                        <ButtonFollow userSubscribed={userSubscribed}/>
                    </div>
                    : <></>          
                }
                <Posts by={userId} userData={props.userData}/>
            </div>
            <div className="col-md-1"><h1>Right Bar</h1></div>
            </div>
        </div>
    )
}

export default ProfilePage