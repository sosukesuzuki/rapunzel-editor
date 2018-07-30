import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import DirectoryList from './DirectoryList'

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
    const { fileTree } = this.props.fileTreeStore

    return (
      <Container>
        {fileTree.type === 'dir' &&
          <DirectoryList directory={fileTree} /> }
      </Container>
    )
  }
}
