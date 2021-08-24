import { Link } from "react-router-dom";
import { useState } from "react"

const Header = (props) => {
    const [userData, setUserData] = useState(props.userData)
    console.log('RENDER HEADER')
    console.log('userData', userData)

    const logout = () => {
        localStorage.removeItem('userData')
        return setUserData(false)
    }

    return(
        
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand mb-0 h1">Tweet</Link>
                
                    <ul className="navbar-nav mr-auto">
                        {!!userData && 
                            <li className="nav-item">
                            <Link to="/profile" className="nav-link"><strong>{userData.user.username}</strong></Link>
                            </li>
                        }
                        <li className="nav-item">
                        <Link to="/" className="nav-link">All Posts</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/following" className="nav-link">Following</Link>
                        </li>
                        {!!userData && 
                            <li className="nav-item">
                                <Link to="/" className="nav-link" onClick={logout}>Log Out</Link>
                            </li>
                        }   
                        {!userData && 
                        
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Log In</Link>
                            </li> 
                        }
                            
                        {!userData && 
                            
                            <li className="nav-item">
                                <Link to="/registration" className="nav-link">Register</Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header