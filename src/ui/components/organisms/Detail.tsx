import React from 'react'
import styled from 'styled-components'
import { grape } from '../../../lib/colors'

const Container = styled.div`
  background-color: ${grape[1]};
`

export default class Detail extends React.Component {
  render () {
    return (
      <Container>
        <h2>Detail</h2>
      </Container>
    )
  }
}
