import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const NavBar = (props) => {

  const padding = {
    paddingRight: 5
  }

  const style = {
    color: 'white',
    fontWeight: '600'
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    props.logout()
    props.setNotification('you are successfully logged out', 5000)
  }

  return (
    <div>
      <Menu inverted>
        <Menu.Item link>
          <Link style={padding} to="/">blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link style={padding} to="/users">users</Link>
        </Menu.Item>
        <Menu.Item link>
          <em style={style}>{props.user.name} is logged in </em>
          <button onClick={() => handleLogout()}>
            logout
          </button>
        </Menu.Item>
      </Menu>
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
    logout,
    setNotification
  }
)(NavBar)