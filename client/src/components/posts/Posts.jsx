import {useState, useEffect} from 'react'

import Post from './Post.jsx'
import FormPost from './FormPost';
import config from '../../config.js'



const Posts = (props) => {
    // console.log('RENDER POSTS')
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postSubmited, setPostSubmited] = useState({})

    useEffect(() => {
        fetch(`${config.base_url}/core/posts/`)
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
    }, [postSubmited])
    
    const handlePostSubmited = (post) => {setPostSubmited(post)}

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        if (posts.length > 0) {
            return (
                <>
                    {!!props.userData ? 
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