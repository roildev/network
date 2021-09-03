import React from "react";
import { useState } from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import './App.css';

// Pages
import RegisterPage from './components/pages/Register.jsx';
import LoginPage from './components/pages/Login.jsx';
import FollowingPage from './components/pages/Following.jsx';

import Header from './components/Header.jsx';
import Posts from './components/posts/Posts.jsx';
import FormPost from './components/posts/FormPost.jsx';

export default function App() {
  console.log('RENDER APP')

  const [userData, setUserData] = useState(!!localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : false)

  const userToLocalStorage = (user) => {
    localStorage.setItem('userData', JSON.stringify(user))
  }

  const handleAuth = (user) => {
    setUserData(user)
    userToLocalStorage(user)
  }
  return (
      <div>
        <Header handleAuth={handleAuth} userData={userData}/>

        <main className="flex-shrink-0 mt-5">
          <div className="container">
            <Switch>
              <Route path="/registration" component={RegisterPage} />
              <Route path="/login">
                <LoginPage handleAuth={handleAuth}/>
              </Route>
              
              
              <Route path="/" exact>
                {!!userData ? 
                  <div>
                    <FormPost/>
                    <Posts userData={userData}/>
                  </div> : 
                  <Posts userData={userData}/>
                }
              </Route>
              {!!userData ? <Route path="/following" component={FollowingPage}/> : <Route render={()=> <h1>You must login</h1>} /> }
              <Route render={()=> <h1>404 Not Found</h1>} />
            </Switch>
          </div>
        </main>
      </div>
  );
}

