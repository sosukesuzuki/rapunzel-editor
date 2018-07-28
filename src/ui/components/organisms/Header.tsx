import React from 'react'
import styled from 'styled-components'
import { grape } from '../../../lib/colors'

const Container = styled.div`
  background-color: ${grape[2]};
  grid-column: 1 / 4;
`

export default class Header extends React.Component {
  render () {
    return (
      <Container>
        <h1>Header</h1>
      </Container>
    )
  }
}