import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index.js'

const AnecdoteForm = (props) => {
    const content = useField('text')
    const author = useField('text')
    const url = useField('text')

    const history = useHistory()

    const resetAllFields = () => {
      content.reset()
      author.reset()
      url.reset()
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.attr.value,
        author: author.attr.value,
        url: url.attr.value
      })
      resetAllFields()
      history.push('/')
    }

    const handleReset = (e) => {
      e.preventDefault()
      resetAllFields()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.attr}/>
          </div>
          <div>
            author
            <input {...author.attr} />
          </div>
          <div>
            url for more info
            <input {...url.attr} />
          </div>
          <button type="submit">create</button>
          <button onClick={handleReset}>reset</button>
        </form>
        
      </div>
    )
  }

  export default AnecdoteForm