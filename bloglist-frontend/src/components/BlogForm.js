import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import Togglable from './Togglable'


const BlogForm = (props) => {

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    try {
      props.createBlog(blogObject)
      props.setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added by username: ${props.user.username}`, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <Togglable buttonLabel="new note">
        <h2>create new</h2>
        <form onSubmit={handleAddBlog}>
          <div>
            title
            <input name='title' />
          </div>
          <div>
            author
            <input name='author' />
          </div>
          <div>
            url
            <input name='url' />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
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
  { createBlog, setNotification, initializeBlogs }
)(BlogForm)