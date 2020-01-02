import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Redirect, withRouter
} from 'react-router-dom'


const App = (props) => {


  useEffect(() => {
    props.initializeBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user).then(blogService.setToken(user.token)
      )
    }
  }, [])


  return (
    <div>
      <Router>
        <NavBar />
        <Notification />
        <LoginForm />
        {props.user === null ?
          <div></div> :
          <div>
            <BlogForm />
            <Route exact path="/" render={() => <BlogList />} />
          </div>
        }
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}


export default connect(
  mapStateToProps,
  {
    initializeBlogs,
    setUser
  }
)(App)
