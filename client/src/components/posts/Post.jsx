import {useEffect, useState} from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const Post = (props) => {
    console.log('RENDER POST')

    const postDate = props.post

    const [likes, setLikes] = useState(+postDate.likes_qty)


    const handleLike = () => {
        if (likes > +postDate.likes_qty) {
            // currentUserLiked = false
            return setLikes(likes - 1)
        }
        // currentUserLiked = true
        return setLikes(+postDate.likes_qty + 1)
        
    }

    let diffOfDate;
    if (postDate.days_ago > 62 && postDate.days_ago <= 730) {
        diffOfDate = `more then ${Math.floor(postDate.days_ago / 30)} mounts ago`
    } else if (postDate.days_ago > 730 ) {
        diffOfDate = `${Math.floor(postDate.days_ago / 365)} years ago`
    } else {
        diffOfDate = `${postDate.days_ago} days ago`
    }

    return (
        <div className="posts__item card">
            <div className="card-header">
                <a href="google.com" className="link-secondary">{postDate.author.charAt(0).toUpperCase() + postDate.author.slice(1)}</a>
                
                <span className="text-muted" style={{float: 'right'}}>{diffOfDate}</span>
            </div>
            <div className="card-body">
                <p className="card-text">{postDate.body}</p>
            </div>
            <div className="card-footer text-muted">
                <button type="button"
                    className="btn btn-secondary" onClick={handleLike}>
                    <ThumbUpAltIcon />
                </button>
                <span style={{marginLeft: '10px'}}>{postDate.likes_qty}</span>
            </div>
        </div>
    )
}

export default Post