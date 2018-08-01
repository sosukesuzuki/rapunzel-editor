import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { observer } from 'mobx-react'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import FileTree from '../molecules/FileTree'
import FileTreeControl from '../molecules/FileTreeControl'

const Container = styled.div`
  background-color: ${grey[0]};
  border-right: 1px solid black;
`

interface SideNavProps {
  fileTreeStore?: FileTreeStore
}

@observer
export default class SideNav extends React.Component<SideNavProps> {
  render () {
    return (
      <Container>
        <FileTreeControl />
        <FileTree />
      </Container>
    )
  }
}
