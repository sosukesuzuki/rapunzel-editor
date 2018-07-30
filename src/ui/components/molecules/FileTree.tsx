import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'

interface FileTreeProps {
  fileTreeStore?: FileTreeStore
  currentFileStore?: CurrentFileStore
}

const Container = styled.div`
`

@inject('fileTreeStore')
@inject('currentFileStore')
@observer
export default class FileTree extends React.Component<FileTreeProps> {
  render () {
    const { currentFileStore } = this.props
    console.log(currentFileStore.currentFile)
    return (
      <Container>
      </Container>
    )
  }
}
