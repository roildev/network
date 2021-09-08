import { useState } from 'react'

import Posts from '../components/posts/Posts';
import FormPost from '../components/posts/FormPost';

const HomePage = (props) => {
    console.log('RENDER HOME')
    const userData = props.userData

    const [postSubmited, setPostSubmited] = useState(false)

    console.log('postSubmited', postSubmited)

    const handlePostSubmited = () => {
        console.log('handlePostSubmited')
        setPostSubmited(true)
    }

    return(
        <>
            {!!userData ? 
                <div>
                    <FormPost handlePostSubmited={handlePostSubmited}/>
                    <Posts postSubmited={postSubmited} userData={userData}/>
                </div> : 
                <Posts userData={userData}/>
            }
        </>
    )
}

export default HomePage