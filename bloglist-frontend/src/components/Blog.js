import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

// const BlogList = ({ blog, handleBlogChange, user, handleBlogRemove }) => {
const Blog = (props) => {

  const blog = props.blog

  const handleLikeClick = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    handleBlogChange(likedBlog)
  }


  const handleBlogChange = async (updatedBlog) => {
    props.updateBlog(updatedBlog)
  }


  const handleBlogRemove = async (blogToDelete) => {
    if (window.confirm(`remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      props.removeBlog(blogToDelete.id)
    }
  }



  const toggleRemoveButton = (blog) => {
    return ({ display: blog.user.username === props.user.username ? '' : 'none' })
  }

  if (blog === undefined) {
    return null
  }


  return (
    <div key={blog.id} className='blog' >
      <div >
        <h3>{blog.title} {blog.author}</h3>
      </div>
      <div>
        <div>{blog.url} <br /></div>
        <div>
          {blog.likes} likes
        <button onClick={() => handleLikeClick(blog)}>like</button><br />
          added by {blog.user.name}<br />
          <div style={toggleRemoveButton(blog)}>
            <button onClick={() => handleBlogRemove(blog)}>remove</button>
          </div>
        </div>
      </div>
    </div >
  )
}



const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object,
  handleBlogChange: PropTypes.func,
  handleRemoveClick: PropTypes.func
}

export default connect(
  mapStateToProps,
  {
    removeBlog,
    updateBlog
  }
)(Blog)