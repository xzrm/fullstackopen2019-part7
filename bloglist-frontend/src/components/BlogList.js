import React from 'react'
import BlogForm from './BlogForm'
import { connect } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div >
      <h2>blogs</h2>
      <BlogForm />
      {props.blogs.sort(byLikes).map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}

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
    removeBlog,
    updateBlog
  }
)(BlogList)