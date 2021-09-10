import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import config from '../../config.js'
import getData from '../../services/getData.js'


const Followers = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [followersList, setFollowersList] = useState(null)

    const token = props.userData.token
    
    useEffect(() => {
        getData(`${config.base_url}/core/followers/${props.by}`, token)
        .then(
            (response) => {
                setIsLoaded(true);
                setFollowersList(response)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

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
                        strict 
                            exact
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