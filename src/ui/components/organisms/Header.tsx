import React from 'react'
import styled from 'styled-components'
import { grape } from '../../../lib/colors'

const Container = styled.div`
  background-color: ${grape[8]};
  grid-column: 1 / 4;
  color: white;
  h1 {
    margin: 0;
    line-height: 40px;
    font-size: 20px;
    padding-left: 10px;
  }
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