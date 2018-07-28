import React from 'react'
import styled from 'styled-components'
import { grape, gray } from '../../../lib/colors'

const Container = styled.div`
  background-color: ${gray[0]};
  grid-column: 1 / 4;
  color: ${grape[4]};
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