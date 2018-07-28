import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { DirectoryOrFile } from '../../../lib/types'
import { grape } from '../../../lib/colors'

interface FileTreeItemProps {
  directory: DirectoryOrFile
  onClick: () => void
}

const Container = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${grape[1]};
  &:hover {
    background-color: ${grape[2]}
  }
`

@observer
export default class FileTreeItem extends React.Component<FileTreeItemProps> {
  render () {
    const { directory, onClick } = this.props
    const { name } = directory
    return (
      <Container onClick={onClick}>
        <span>{name}</span>
      </Container>
    )
  }
}

