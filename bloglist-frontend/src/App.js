import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import User from './components/User'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { Container } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


const App = () => {

  const findById = (collection, id) =>
    collection.find(u => u.id === id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUsers())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
        .then(blogService
          .setToken(user.token)
        )
    }
  }, [dispatch])

  const loggedUser = useSelector(stake => stake.user)
  const users = useSelector(stake => stake.users)
  const blogs = useSelector(stake => stake.blogs)

  return (
    <div>

      {
        loggedUser === null
          ? <Container>
            <Notification />
            <LoginForm />
          </Container>
          : <div>
            <Router>
              <NavBar />
              <Container>
                <Notification />
                <Route exact path="/" render={() => <BlogList />} />
                <Route exact path="/users" render={() => <UsersList />} />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User user={findById(users, match.params.id)} />} />
                <Route exact path="/blogs/:id" render={({ match }) =>
                  <Blog blog={findById(blogs, match.params.id)} />} />
              </Container>
            </Router>
          </div>
      }

    </div>
  )
}



export default App
