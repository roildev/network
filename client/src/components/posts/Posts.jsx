import {useState, useEffect} from 'react'

import Post from './Post.jsx'
import config from '../../config.js'



const Posts = (props) => {
    console.log('RENDER POSTS')
    console.log('props', props)
    const [userData, setUserData] = useState(props.userData);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState(null);
    const [postSubmited, setPostSubmited] = useState(false)
    console.log(props.postSubmited)

    if (props.postSubmited) {
        setPostSubmited(true)
    }

    useEffect(() => {
        console.log('INIT')
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

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        if (posts != null) {
            return (
                <div className="posts col-md-7 offset-2">
                    {posts.map(post => {
                        return <Post userData={userData} key={post.id} post={post}/>
                    })}
                </div>
            )
        } else {
            return <div>Загрузка...</div>;
        }
    }
}

export default Posts