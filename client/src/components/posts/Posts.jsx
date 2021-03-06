import {useState, useEffect} from 'react'

import Post from './Post.jsx'
import FormPost from './FormPost';
import Toast from '../Toast'
import config from '../../config.js'
import getData from '../../services/getData.js'



const Posts = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState(null);
    const [postData, setPostData] = useState(null)
    const [postsBy, setPostsBy] = useState(props.by)
    const [postSubmited, setPostSubmited] = useState({})
    const [postsUrl, setPostsUrl] = useState(props.by === 'all' ? `${config.base_url}/core/posts/?limit=10&offset=0` : `${config.base_url}/core/posts/${props.by}?limit=10&offset=0`)
    const [postAuthor, setPostAuthor] = useState('')
    const [showToast, setShowToast] = useState(false)

    if (postAuthor !== props.username) {
        setPostAuthor(props.username)
        setPosts(null)
    }

    if (postsBy !== props.by) {
        setPostsBy(props.by)
        setPostsUrl(props.by === 'all' ? `${config.base_url}/core/posts/?limit=10&offset=0` : `${config.base_url}/core/posts/${props.by}?limit=10&offset=0`)
    }
    
    document.addEventListener('scroll', (e) => {
        if (window.innerHeight + window.scrollY + 5 >= document.body.offsetHeight) {
            if (postData !== null) {
                if (postData.next !== null) {
                    setPostsUrl(postData.next)
                }
            }
        }
    })

    useEffect(() => {
        getData(postsUrl)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostData(result)
                    if (result.results !== null) {
                        if (posts !== null) {
                            setPosts([...posts, ...result.results])
                        } else { setPosts(result.results) }
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )            
    }, [postSubmited, postsBy, postsUrl])
    
    const handlePostSubmited = (post) => {
        setPosts(null)
        setPostSubmited(post)
        setPostsUrl(props.by === 'all' ? `${config.base_url}/core/posts/?limit=10&offset=0` : `${config.base_url}/core/posts/${props.by}?limit=10&offset=0`)
    }

    const handleCloseToast = () => {
        setShowToast(false)
    }

    const handleShowToast = () => {
        setShowToast(true)
        setTimeout(handleCloseToast, 3000);
    }

    if (error) {
        return <div>????????????: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>????????????????...</div>;
    } else {
        if (posts !== null) {
            return (
                <>
                    {(!!props.userData && props.by === 'all') ||
                    (!!props.userData && postAuthor === props.userData.user.username) ? 
                        <>
                            <FormPost handlePostSubmited={handlePostSubmited}/>
                            <div className="posts col-md-7 offset-2">
                                {posts.map(post => {
                                    return <Post userData={props.userData} key={post.id} post={post} handleShowToast={() => handleShowToast(post)}/>
                                })}
                            </div>
                        </>
                        :
                        <div className="posts col-md-7 offset-2">
                            {posts.map(post => {
                                return <Post userData={props.userData} key={post.id} post={post} handleShowToast={() => handleShowToast(post)} />
                            })}
                        </div>
                    }
                    {
                        postData.next === null ?
                        <div className="alert alert-dark" role="alert">
                            You have looked at all posts
                        </div>
                        : <></>
                    }
                    <Toast tostBody="Post was changed saccessfully" tostHeader="Success!" handleCloseToast={handleCloseToast} showToast={showToast} />
                </>
            )
        } else {
            return <div>????????????????...</div>;
        }
    }
}

export default Posts