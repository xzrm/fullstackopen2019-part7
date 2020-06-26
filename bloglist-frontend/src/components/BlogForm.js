import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { Button, Form } from 'semantic-ui-react'


const BlogForm = () => {

  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)

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
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} 
                                by ${blogObject.author} 
                                added by username: ${loggedUser.username}`
      , 5000))
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <Togglable buttonLabel="new blog">
        <h3>create new</h3>
        <Form onSubmit={handleAddBlog} size='mini'>
          <Form.Field >
            <label>title</label>
            <Form.Input id='title' placeholder='title' name='title' />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <Form.Input id='author' placeholder='author' name='author' />
          </Form.Field>
          <Form.Field>
            <label>url</label>
            <Form.Input id='url' placeholder='url' name='url' />
          </Form.Field>
          <Button id='createButton' type="submit" size='small'>create</Button>
        </Form>
      </Togglable>
    </div>
  )
}

export default BlogForm