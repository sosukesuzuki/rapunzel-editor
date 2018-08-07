import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'

const Container = styled.div`
  background: white;
  grid-column: 1 / 4;
  color: black;
  border-bottom: 0.5px solid ${grey[3]};
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
        <h1>Rapunzel</h1>
      </Container>
    )
  }
}