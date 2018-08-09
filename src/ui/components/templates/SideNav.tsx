import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { observer, inject } from 'mobx-react'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import FileTree from '../organisms/FileTree'

const Container = styled.div`
  background-color: white;
  border-right: 1px solid ${grey[3]};
  font-size: 14px;
`

interface SideNavProps {
  fileTreeStore?: FileTreeStore
}

@inject('fileTreeStore')
@observer
export default class SideNav extends React.Component<SideNavProps> {
  render () {
    const { fileTree } = this.props.fileTreeStore
    return (
      <Container>
        <FileTree directory={fileTree} />
      </Container>
    )
  }
}
