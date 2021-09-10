import { NavLink } from "react-router-dom";
import { useState } from "react"
import { Redirect } from "react-router"

const Header = (props) => {
    console.log('RENDER HEADER')
    const handleAuth = props.handleAuth
    const [userData, setUserData] = useState(props.userData)

    if (!userData) {
        if (!!props.userData) {
            setUserData(props.userData)
        }
    }

    const logout = () => {
        localStorage.removeItem('userData')
        setUserData(false)
        handleAuth(false)
        return <Redirect to="/" />;
    }

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand mb-0 h1">Tweet</NavLink>
                
                    <ul className="navbar-nav mr-auto">
                        {!!userData && 
                            <li className="nav-item">
                            <NavLink to={`/profile/${userData.user.id}?username=${userData.user.username}`} className="nav-link"><strong>{userData.user.username}</strong></NavLink>
                            </li>
                        }
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link">All Posts</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/following" className="nav-link">Following</NavLink>
                        </li>
                        {!!userData && 
                            <li className="nav-item">
                                <button style={{backgroundColor: 'transparent', border: 'none'}} className="nav-link" onClick={logout}>Log Out</button>
                            </li>
                        }   
                        {!userData && 
                        
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Log In</NavLink>
                            </li> 
                        }
                            
                        {!userData && 
                            
                            <li className="nav-item">
                                <NavLink to="/registration" className="nav-link">Register</NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header