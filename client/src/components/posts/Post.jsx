import {useEffect, useState} from 'react'

const Post = (props) => {

    const postDate = props.post

    const [likes, setLikes] = useState(+postDate.likes_qty)
    // let liked = false
    // if (props.userData) {
    //     liked = props.post.includes(props.userData.id)
    // }

    // // Check if user liked this post yet


    // let currentUserLiked = false,
    //     usersLiked = postDate.likes_user_ids.map(id => id.user_id)
    // const currentUserId = JSON.parse(localStorage.getItem("userData")).id
    
    // currentUserLiked = usersLiked.includes(currentUserId)

    // // useEffect(() => {
    // //     if (likes > +postDate.likes_qty && currentUserLiked) {
    // //         fetch(`http://127.0.0.1:8000/like/${+postDate.id}`)
    // //             .then(res => res.json())
    // //             .then(result => console.log(result))
    // //     } else {
    // //         fetch(`http://127.0.0.1:8000/unlike/${+postDate.id}`)
    // //             .then(res => res.json())
    // //             .then(result => console.log(result))
    // //    }
    // //    console.log("like", likes, "+postDate.likes_qty", +postDate.likes_qty, "currentUserLiked", currentUserLiked)

    // // })


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

    // // const doLike = () => {setLike(like +1)}
    

    // console.log("RENDER POST")
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
                    <i className="bi bi-hand-thumbs-up"></i>
                </button>
                {/* <button type="button"
                    className={`btn ${currentUserLiked ? "btn-outline-danger" : "btn-secondary"}`} onClick={handleLike}>
                    <i className="bi bi-hand-thumbs-up"></i>
                </button> */}
                <span style={{marginLeft: '10px'}}>{postDate.likes_qty}</span>
            </div>
        </div>
    )
}

export default Post