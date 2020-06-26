import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Menu, Button, Container } from 'semantic-ui-react'

const padding = {
  paddingRight: 5
}

const NavBar = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logout())
    dispatch(setNotification('you are successfully logged out',
      5000))
  }

  return (
    <Menu inverted>
      <Container>
        <Menu.Item link>
          <Link style={padding} to="/">blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link style={padding} to="/users">users</Link>
        </Menu.Item>
        <Menu.Item position='right'>
          <em>{loggedUser.name} is logged in </em>

          <Button style={{ marginLeft: '0.5em' }}
            onClick={() => handleLogout()}>
            Log out
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  )
}


export default NavBar