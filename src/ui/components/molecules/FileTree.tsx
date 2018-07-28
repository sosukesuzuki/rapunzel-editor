import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Directories } from '../../../lib/types'
import FileTreeItem from '../atoms/FileTreeItem'

interface FileTreeProps {
  directories: Directories
}

const Container = styled.div`
`

@observer
export default class FileTree extends React.Component<FileTreeProps> {
  render () {
    const { directories } = this.props
    return (
      <Container>
        {directories.map((directory, i) => {
          return (
            <FileTreeItem key={`${directory.name}${i}`} directory={directory} />
          )
        })}
      </Container>
    )
  }
}
