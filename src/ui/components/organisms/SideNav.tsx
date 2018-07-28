import React from 'react'
import styled from 'styled-components'
import { grape } from '../../../lib/colors'
import { inject, observer } from 'mobx-react'
import { DirectoriesStore } from '../../../lib/stores/DirectoriesStore'
import FileTree from '../molecules/FileTree'
import FileTreeControl from '../molecules/FileTreeControl'

const Container = styled.div`
  background-color: ${grape[0]};
`

interface SideNavProps {
  directoriesStore?: DirectoriesStore
}

@inject('directoriesStore')
@observer
export default class SideNav extends React.Component<SideNavProps> {
  render () {
    const { directories } = this.props.directoriesStore
    return (
      <Container>
        <FileTreeControl />
        <FileTree directories={directories} />
      </Container>
    )
  }
}
