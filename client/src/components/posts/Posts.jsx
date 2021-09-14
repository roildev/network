import {useState, useEffect} from 'react'

import Post from './Post.jsx'
import FormPost from './FormPost';
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
                            console.log(postData)
                        } else { setPosts(result.results) }
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )            
    }, [postSubmited, postsBy, postsUrl])
    
    const handlePostSubmited = (post) => {setPostSubmited(post)}

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        if (posts !== null) {
            return (
                <>
                    {!!props.userData && props.by === 'all' ? 
                        <>
                            <FormPost handlePostSubmited={handlePostSubmited}/>
                            <div className="posts col-md-7 offset-2">
                                {posts.map(post => {
                                    return <Post userData={props.userData} key={post.id} post={post}/>
                                })}
                            </div>
                        </>
                        :
                        <div className="posts col-md-7 offset-2">
                            {posts.map(post => {
                                return <Post userData={props.userData} key={post.id} post={post}/>
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
                </>
            )
        } else {
            return <div>Загрузка...</div>;
        }
    }
}

export default Posts