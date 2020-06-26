import React from 'react'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Segment, Header } from 'semantic-ui-react'

const BlogList = () => {

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const blogs = useSelector(state => state.blogs)

  return (
    <div >
      <Header as='h3' block>
        Blogs
      </Header>
      <BlogForm />
      {blogs.sort(byLikes).map(blog =>
        <Segment vertical size='small' key={blog.id} >
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </Segment>
      )}
    </div>
  )
}

export default BlogList