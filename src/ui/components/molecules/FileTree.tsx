import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { FileNode } from '../../../lib/types'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'

interface FileTreeProps {
  fileTree: FileNode
  currentFileStore?: CurrentFileStore
}

const Container = styled.div`
`

@inject('currentFileStore')
@observer
export default class FileTree extends React.Component<FileTreeProps> {
  render () {
    const { fileTree } = this.props
    console.log(fileTree)
    return (
      <Container>
      </Container>
    )
  }
}
