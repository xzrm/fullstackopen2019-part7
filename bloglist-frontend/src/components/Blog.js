import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

// const BlogList = ({ blog, handleBlogChange, user, handleBlogRemove }) => {
const BlogList = (props) => {
  const [visible, setVisible] = useState(false)


  const blog = props.blog

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

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


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const toggleRemoveButton = (blog) => {
    return ({ display: blog.user.username === props.user.username  ? '' : 'none' })
  }

  return (
    <div >
      <div key={blog.id} style={blogStyle} className='blog'>
        <div onClick={toggleVisiblity}>
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible} className="togglableContent">
          {blog.url} <br />
          {blog.likes} likes
          <button onClick={() => handleLikeClick(blog)}>like</button><br />
          added by {blog.user.name}<br />
          <div style={toggleRemoveButton(blog)}>
            <button onClick={() => handleBlogRemove(blog)}>remove</button>
          </div>
        </div>
      </div>
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

BlogList.propTypes = {
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
)(BlogList)