import {useState, useEffect} from 'react'

import Post from './Post.jsx'
import FormPost from './FormPost';
import config from '../../config.js'



const Posts = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState(null);
    const [postsBy, setPostsBy] = useState(props.by)
    const [postSubmited, setPostSubmited] = useState({})
    const [postsUrl, setPostsUrl] = useState(props.by === 'all' ? `${config.base_url}/core/posts/` : `${config.base_url}/core/posts/${props.by}`)

    if (postsBy !== props.by) {
        setPostsBy(props.by)
        setPostsUrl(props.by === 'all' ? `${config.base_url}/core/posts/` : `${config.base_url}/core/posts/${props.by}`)
    }

    useEffect(() => {
        fetch(postsUrl)
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPosts(result)
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
                </>
            )
        } else {
            return <div>Загрузка...</div>;
        }
    }
}

export default Posts