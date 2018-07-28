import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
  height: 100%;
`

interface AddFileButtonProps {
  onClick: () => void
}

export default class AddFileButton extends React.Component<AddFileButtonProps> {
  render () {
    const { onClick } = this.props
    return (
      <Container onClick={onClick}>
        Add a file
      </Container>
    )
  }
}
