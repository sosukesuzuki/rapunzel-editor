import React from 'react'
import styled from 'styled-components'
import AddFileButton from '../atoms/AddFileButton'

const Container = styled.div`
  display: flex;
`

export default class FileTreeControl extends React.Component {
  render () {
    return (
      <Container>
        <h2>File Tree</h2>
        <div>
          <AddFileButton />
        </div>
      </Container>
    )
  }
}
