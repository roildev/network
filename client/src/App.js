import React from "react";
import {
  BrowserRouter as Router,
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
  const userData = !!localStorage.getItem('userData') ?
    JSON.parse(localStorage.getItem('userData')) : false
  return (
    <Router>
      <div>
        <Header userData={userData} />

        <main className="flex-shrink-0 mt-5">
          <div className="container">
            <Switch>
              <Route path="/registration">
                <RegisterPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/following">
                <FollowingPage />
              </Route>
              <Route path="/">
                <div>
                  {!!userData &&
                    <FormPost />
                  }
                  <Posts userData={userData}/>
                </div>
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

