import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeBlog, updateBlog, addComment } from '../reducers/blogReducer'

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

  const showComments = (blog) => {
    if (blog.comments.length > 0) {
      return (
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}> {comment}</li>)}
        </ul>
      )
    } else {
      return (<div>no comments</div>)
    }
  }

  const addComment = (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    event.target.comment.value = ''
    if (comment.trim().length !== 0) {
      props.addComment(blog.id, comment)
    }
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
          <div>
            <h4>comments:</h4>
            <form onSubmit={addComment}>
              <div>
                <input name='comment' />
              </div>
              <button type="submit">add comment</button>
            </form>
            {showComments(blog)}
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
    updateBlog,
    addComment
  }
)(Blog)