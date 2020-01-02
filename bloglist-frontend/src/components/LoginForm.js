import React from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    event.target.username = ''
    event.target.password = ''

    try {
      props.login(credentials)
      props.setNotification('you are successfully logged in', 5000)

    } catch (exception) {
      props.setNotification('wrong username or password', 5000)
      console.log(exception)
    }
  }



  return (
    props.user === null ?
      <div>
        <h2>log in to application</h2>

        <form onSubmit={handleLogin} className='Login'>
          <div>
            username
            <input name='username' />
          </div>
          <div>
            password
            <input name='password' type='password' />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      : <div></div>
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
    login,
    logout,
    setNotification
  }
)(LoginForm)