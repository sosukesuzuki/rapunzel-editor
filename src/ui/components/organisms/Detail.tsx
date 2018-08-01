import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import MarkdownRenderer from '../atoms/MarkdownRenderer'

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
    const { currentFileStore } = this.props
    return (
      <Container>
        <h1>{currentFileStore.currentFile == null
          ? ''
          : currentFileStore.currentFile.pathname}</h1>
        <MarkdownRenderer
          content={currentFileStore.currentFile == null
            ? ''
            : currentFileStore.currentFile.content} />
      </Container>
    )
  }
}
