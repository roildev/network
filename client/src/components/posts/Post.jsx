import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import postData from '../../services/postData.js'
import deleteData from '../../services/deleteData.js'
import config from '../../config.js'

const Post = (props) => {
    console.log('RENDER POST')

    const postInfo = props.post
    const userId = !!props.userData ? props.userData.user.id : false

    const [likes, setLikes] = useState(+postInfo.likes_qty)
    const [currentUserLikedPost, setCurrentUserLikedPost] = useState(!!props.userData ? postInfo.likes_users_ids.includes(userId) : false)

    const handleLike = () => {
        const data = { "post": props.post.id }
        if (currentUserLikedPost) {
            deleteData(
                `${config.base_url}/core/unlike/`,
                data,
                props.userData.token
            ).then(response => {
                if (response) {
                    setLikes(likes - 1)
                    setCurrentUserLikedPost(false)
                }
            })
            .catch(err => {throw new Error(err)})
        } else {
            postData(
                `${config.base_url}/core/like/`,
                data,
                props.userData.token
            ).then(response => {
                setLikes(likes + 1)
                setCurrentUserLikedPost(true)
            })
        }
    }

    let diffOfDate;
    if (postInfo.days_ago > 62 && postInfo.days_ago <= 730) {
        diffOfDate = `more then ${Math.floor(postInfo.days_ago / 30)} mounts ago`
    } else if (postInfo.days_ago > 730 ) {
        diffOfDate = `${Math.floor(postInfo.days_ago / 365)} years ago`
    } else {
        diffOfDate = `${postInfo.days_ago} days ago`
    }

    return (
        <div className="posts__item card">
            <div className="card-header">
                <NavLink to={`/profile/${postInfo.author_id}?username=${postInfo.author}`} className="link-secondary">      
                    {postInfo.author.charAt(0).toUpperCase() + postInfo.author.slice(1)} <strong>{postInfo.author_id}</strong>
                </NavLink>
                
                <span className="text-muted" style={{float: 'right'}}>{diffOfDate}</span>
            </div>
            <div className="card-body">
                <p className="card-text">{postInfo.body}</p>
            </div>
            <div className="card-footer text-muted">
                <button type="button"
                    className="btn btn-secondary" onClick={handleLike}>
                    <ThumbUpAltIcon />
                </button>
                <span style={{marginLeft: '10px'}}>{likes}</span>
            </div>
        </div>
    )
}

export default Post