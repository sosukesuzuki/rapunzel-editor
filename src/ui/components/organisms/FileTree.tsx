import React from 'react'
import styled from 'styled-components'
import { grape } from '../../../lib/colors'

const Container = styled.div`
  background-color: ${grape[0]};
`

export default class FileTree extends React.Component {
  render () {
    return (
      <Container>
        <h2>File Tree</h2>
      </Container>
    )
  }
}
