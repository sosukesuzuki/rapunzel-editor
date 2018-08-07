import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { observer } from 'mobx-react'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import FileTree from '../organisms/FileTree'

const Container = styled.div`
  background-color: white; 
  border-right: 1px solid ${grey[3]};
`

interface SideNavProps {
  fileTreeStore?: FileTreeStore
}

@observer
export default class SideNav extends React.Component<SideNavProps> {
  render () {
    return (
      <Container>
        <FileTree />
      </Container>
    )
  }
}
