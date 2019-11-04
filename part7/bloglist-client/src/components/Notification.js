import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import usePrevious from '../hooks/usePrevious'

const StyledDiv = styled.div`
  background: lightgrey;
  font-size: 1.2em;
  border: 0.2em solid ${props => props.type === 'error' ? 'FireBrick' : 'Green'};
  border-radius: 5px;
  padding: 1em;
  text-align: center;
  color: ${props => props.type === 'error' ? 'FireBrick' : 'Green'}
`

const Notification = ({ notification }) => {
  const [isVisible, setVisibility] = useState(false)
  const prevNotification = usePrevious(notification)
  const timeoutID = useRef(0)

  const showNotification = () => {
    if (!isVisible) {
      setVisibility(true)
    }
    clearTimeout(timeoutID.current)
    timeoutID.current = setTimeout(() => {
      setVisibility(false)
    }, 10000)
  }

  if (notification !== prevNotification) {
    showNotification()
  }

  if (!isVisible) {
    return null
  }

  const { message, type } = notification

  return (
    <StyledDiv type={type}>
      {message}
    </StyledDiv>
  )
}

const mapStateToProps = state => {
  const { notifications } = state
  return {
    notification: notifications[notifications.length - 1]
  }
}

export default connect(mapStateToProps)(Notification)

