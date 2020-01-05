import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



const UsersList = (props) => {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>


    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
    users: state.users
  }
}


export default connect(
  mapStateToProps,
  {}
)(UsersList)

