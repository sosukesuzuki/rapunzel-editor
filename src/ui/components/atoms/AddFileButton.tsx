import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
`

interface AddFileButtonProps {
  onClick: () => void
}

export default class AddFileButton extends React.Component<AddFileButtonProps> {
  render () {
    const { onClick } = this.props
    return (
      <Container onClick={onClick}>
        <span>Add a file</span>
      </Container>
    )
  }
}
