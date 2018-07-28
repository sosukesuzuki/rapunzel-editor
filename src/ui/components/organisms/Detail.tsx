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
    const { currentFile } = currentFileStore

    return (
      <Container>
        <h3>{currentFile == null
          ? 'File is not selected.'
          : `${currentFile.path}`
        }</h3>
      </Container>
    )
  }
}
