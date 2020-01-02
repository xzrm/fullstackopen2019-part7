import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notificationToDisplay = props.notification

  return (
    <div>
      {notificationToDisplay === '' ?
        <div></div> :
        <div style={style}>
          {notificationToDisplay}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification