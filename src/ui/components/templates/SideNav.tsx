import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { observer, inject } from 'mobx-react'
import Stores from '../../../lib/stores'
import FileTree from '../organisms/FileTree'
import { FileNode } from '../../../lib/types'

const Container = styled.div`
  background-color: white;
  border-right: 1px solid ${grey[3]};
  overflow-y: scroll;
  font-size: 14px;
`

interface SideNavProps {
  fileTree?: FileNode
}

@inject((s: Stores) => ({
  fileTree: s.fileTreeStore.fileTree
}))
@observer
export default class SideNav extends React.Component<SideNavProps> {
  render () {
    const { fileTree } = this.props
    return (
      <Container>
        <FileTree directory={fileTree} />
      </Container>
    )
  }
}
