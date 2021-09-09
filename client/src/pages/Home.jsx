import Posts from '../components/posts/Posts';

const HomePage = (props) => {
    console.log('RENDER HOME')
    const userData = props.userData

    return <Posts userData={userData}/>
}

export default HomePage