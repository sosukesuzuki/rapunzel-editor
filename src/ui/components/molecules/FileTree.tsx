import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Directories, DirectoryOrFile } from '../../../lib/types'
import FileTreeItem from '../atoms/FileTreeItem'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import { readFile } from '../../../lib/filesystem/queries/readFile'

interface FileTreeProps {
  directories: Directories
  currentFileStore?: CurrentFileStore
}

const Container = styled.div`
`

@inject('currentFileStore')
@observer
export default class FileTree extends React.Component<FileTreeProps> {
  handleFileClick = async (directory: DirectoryOrFile) => {
    const { currentFileStore } = this.props
    if (directory.files == null) {
      const path = `./${directory.name}`
      const content = await readFile(path)
      currentFileStore.setCurrentFile({
        path, content
      })
    }
  }

  render () {
    const { directories } = this.props
    return (
      <Container>
        {directories.map((directory, i) => {
          return (
            <FileTreeItem 
              key={`${directory.name}${i}`}
              directory={directory}
              onClick={() => this.handleFileClick(directory)}
            />
          )
        })}
      </Container>
    )
  }
}
