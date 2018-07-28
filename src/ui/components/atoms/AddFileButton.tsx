import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
`

export default class AddFileButton extends React.Component {
  render () {
    return (
      <Container onClick={() => console.log('Add a file.')}>
        <span>Add a file</span>
      </Container>
    )
  }
}
