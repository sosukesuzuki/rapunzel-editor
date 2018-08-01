import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import MarkdownRenderer from '../atoms/MarkdownRenderer'
import DetailHeader from '../molecules/DetailHeader'

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
        {currentFileStore.currentFile != null &&
          <DetailHeader
            pathname={currentFileStore.currentFile == null
              ? ''
              : currentFileStore.currentFile.pathname} />
        }
        <MarkdownRenderer
          content={currentFileStore.currentFile == null
            ? ''
            : currentFileStore.currentFile.content} />
      </Container>
    )
  }
}
