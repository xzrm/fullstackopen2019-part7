import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import About from './components/About'
import AnecdoteForm from './components/AnecdoteForm'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created`)
    
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }


  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Header />
        <Notification notification={notification} />
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path="/create" render={() => <AnecdoteForm addNew={addNew} />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/anecdotes/:id" render={({ match }) =>
          <Anecdote anecdote={anecdoteById(match.params.id)} />} />
      </Router>
      <Footer />
    </div>
  )
}

export default App;