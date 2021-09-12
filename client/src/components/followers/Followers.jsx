import { NavLink } from 'react-router-dom'

const Followers = (props) => {
    console.log('RENDER FOLLOWERS')


    if (props.error) {
        return <div>Ошибка: {props.error.message}</div>;
    } else if (!props.isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        if (props.followersList !== null) {
            return (
                <div className="list-group">
                    {props.followersList.map(follower => {
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