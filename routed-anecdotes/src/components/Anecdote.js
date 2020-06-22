import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <li>
        {anecdote.content}
      </li>
    </div>
  )
}

export default Anecdote