import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, updateBlog, addComment } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'
import { Segment, Button, Form, Icon, Grid } from 'semantic-ui-react'


const BlogNoHistory = (props) => {

  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)
  const blog = props.blog
  const history = useHistory()

  const [visible, setVisible] = useState(true)

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const handleLikeClick = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(likedBlog))
  }


  const handleBlogRemove = async (blogToDelete) => {
    if (window.confirm(`remove blog ${blogToDelete.title}
                      by ${blogToDelete.author}?`)) {
      dispatch(removeBlog(blogToDelete.id))
      history.push('/')
    }
  }


  const toggleRemoveButton = (blog) => {
    return ({
      display: blog.user.username === loggedUser.username
        ? ''
        : 'none'
    })
  }


  if (blog === undefined) {
    return null
  }

  const commentsToShow = blog.comments.length > 0
    ? <ul key={blog.id}>
      {blog.comments.map(comment =>
        <li key={comment.id}> {comment}</li>
      )}
    </ul >
    : <div>no comments</div>


  const addNewComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    if (comment.trim().length !== 0) {
      dispatch(addComment(blog.id, comment))
    }
  }


  return (
    <div key={blog.id} className='blog' >
      <Segment>
        <h3>{blog.title} by {blog.author} </h3>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          added by {blog.user.name}
        </div>
        <div>{blog.likes} likes</div>

        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Button size='small' onClick={() => handleLikeClick(blog)}>
                <Icon name='thumbs up' />like
              </Button>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Button size='small' onClick={() => toggleVisiblity()}>
                <Icon name='comment' />comment
              </Button>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <div style={toggleRemoveButton(blog)}>
                <Button inverted color='red' size='small' onClick={() => handleBlogRemove(blog)}>
                  <Icon name='remove circle' />remove
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Segment>
          <div style={{ display: visible ? 'none' : '' }}>
            <Form onSubmit={addNewComment}>
              <Form.Field>
                <label>Add comment</label>
                <Form.Input name='comment' />
                <Button type="submit">
                  submit
                </Button>
              </Form.Field>
            </Form>
          </div>
          {commentsToShow}
        </Segment>
      </Segment>
    </div >
  )
}

const Blog = withRouter(BlogNoHistory)
export default Blog