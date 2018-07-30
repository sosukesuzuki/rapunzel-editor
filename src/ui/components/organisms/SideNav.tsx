import React from 'react'
import styled from 'styled-components'
import { grape } from '../../../lib/colors'
import { inject, observer } from 'mobx-react'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import FileTree from '../molecules/FileTree'
import FileTreeControl from '../molecules/FileTreeControl'

const Container = styled.div`
  background-color: ${grape[0]};
`

interface SideNavProps {
  fileTreeStore?: FileTreeStore
}

@inject('fileTreeStore')
@observer
export default class SideNav extends React.Component<SideNavProps> {
  render () {
    const { fileTreeStore } = this.props
    return (
      <Container>
        <FileTreeControl />
        <FileTree fileTree={fileTreeStore.fileTree} />
      </Container>
    )
  }
}
