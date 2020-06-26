import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    event.target.username = ''
    event.target.password = ''


    const loggedUser = await dispatch(login(credentials))

    if (loggedUser === undefined) {
      dispatch(setNotification('wrong username or password', 5000))
      return
    }
    dispatch(setNotification('you are successfully logged in', 5000))
  }


  const loggedUser = useSelector(state => state.user)


  return (
    loggedUser === null ?

      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            Log-in to your account
          </Header>
          <Form onSubmit={handleLogin} className='Login' size='large'>
            <Segment raised>
              <Form.Field >
                <label>username</label>
                <Form.Input id='username' fluid icon='user' iconPosition='left' placeholder='username ' name='username' />
              </Form.Field>
              <Form.Field>
                <label>password</label>
                <Form.Input id='password' fluid icon='lock' iconPosition='left' placeholder='password' name='password' type='password' />
              </Form.Field>
              <Button type="submit" fluid size='large'>
                login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      : <div></div>
  )
}

export default LoginForm