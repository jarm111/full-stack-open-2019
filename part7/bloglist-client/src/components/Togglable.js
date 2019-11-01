import React, { useState, useImperativeHandle, forwardRef } from 'react'
import styled from 'styled-components'

const HideWhenVisible = styled.div`
  display: ${props => props.visible ? 'none' : ''};
`

const ShowWhenVisible = styled.div`
  display: ${props => props.visible ? '' : 'none'};
`

const Togglable = ({ children, buttonLabel, }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div>
      <HideWhenVisible visible={visible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </HideWhenVisible>
      <ShowWhenVisible visible={visible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </ShowWhenVisible>
    </div>
  )
}

export default forwardRef(Togglable)
