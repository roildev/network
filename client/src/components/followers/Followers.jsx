import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import config from '../../config.js'
import getData from '../../services/getData.js'


const Followers = (props) => {
    console.log('RENDER FOLLOWERS')
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [followersList, setFollowersList] = useState(null)
    const [url, setUrl] = useState(`${config.base_url}/core/followers/${props.by}`)
    const [token, setToken] = useState(!!props.userData ? props.userData.token : false)
    
    if (url !== `${config.base_url}/core/followers/${props.by}`) {
        setUrl(`${config.base_url}/core/followers/${props.by}`)
    }

    if (!!token && token !== props.userData.token) {
        setToken(props.userData.token)
    }

    
    useEffect(() => {
        getData(url, token)
        .then(
            (response) => {
                setIsLoaded(true);
                console.log('FALLOWERS --> ',response )
                setFollowersList(response)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [url, token])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        if (followersList !== null) {
            return (
                <div className="list-group">
                    {followersList.map(follower => {
                        return <NavLink 
                            to={`/profile/${follower.follower_id}?username=${follower.follower}`}
                            key={follower.id}
                            className="list-group-item list-group-item-action">
                            {follower.follower}
                        </NavLink>
                    })}
                </div>
            )
        } else {
            return <div>Загрузка...</div>;
        }
    }
}

export default Followers