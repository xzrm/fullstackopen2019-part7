import React from 'react'
import { connect } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div >
      <h2>blogs</h2>
      {props.blogs.sort(byLikes).map(blog =>
        <Blog key={blog.id} blog={blog} />
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