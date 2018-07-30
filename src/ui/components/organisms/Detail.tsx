import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'

interface DetaiProps {
  currentFileStore?: CurrentFileStore
}

const Container = styled.div`
  background-color: ${grey[0]};
`

@inject('currentFileStore')
@observer
export default class Detail extends React.Component<DetaiProps> {
  render () {
    return (
      <Container>
      </Container>
    )
  }
}
