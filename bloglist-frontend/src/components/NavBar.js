import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Menu = (props) => {

  const padding = {
    paddingRight: 5
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    props.logout()
    props.setNotification('you are successfully logged out', 5000)
  }

  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {props.user === null ?
        <div></div>
        : <div>{props.user.name} is logged in
          <button onClick={() => handleLogout()}>
            logout
          </button></div>
      }
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
)(Menu)