import React from 'react'
import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'


const Notification = () => {

  const notificationToDisplay = useSelector(state => state.notification)

  return (
    <div>
      {notificationToDisplay === '' ?
        <div></div> :
        <Message>
          <p>
            {notificationToDisplay}
          </p>
        </Message>
      }
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     notification: state.notification
//   }
// }

// const ConnectedNotification = connect(
//   mapStateToProps
// )(Notification)

export default Notification