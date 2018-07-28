import React from 'react'
import styled from 'styled-components'
import { grape } from '../../../lib/colors'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'

interface DetaiProps {
  currentFileStore: CurrentFileStore
}

const Container = styled.div`
  background-color: ${grape[1]};
`

@inject('currentFileStore')
@observer
export default class Detail extends React.Component<DetaiProps> {
  render () {
    const { currentFileStore } = this.props

    if (currentFileStore.currentFile != null) console.log(currentFileStore.currentFile.path)

    return (
      <Container>
        <h2>Detail</h2>
      </Container>
    )
  }
}
