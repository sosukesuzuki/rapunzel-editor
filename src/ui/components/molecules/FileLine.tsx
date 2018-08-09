import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { FileNode } from '../../../lib/types'
import { observer, inject } from 'mobx-react'
import { grey } from '../../../lib/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fileNodePadding } from '../../../lib/fileNodePadding'
import { unlink } from '../../../lib/filesystem/commands/unlink'
import { readFileNode } from '../../../lib/utils/getFileTree'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import { readFile } from '../../../lib/filesystem/queries/readFile'
import Button from '../atoms/Button'
import FileTreeLine from '../atoms/FileTreeLine'

interface FileLineProps {
  file: FileNode
  fileTreeStore?: FileTreeStore
  currentFileStore?: CurrentFileStore
}

interface ContainerProps {
  paddingLeft: number
  isSelected: boolean
}

const Container = styled(FileTreeLine)`
  padding-left: ${(props: ContainerProps) => props.paddingLeft}px;
  background-color: ${({ isSelected }: ContainerProps) => isSelected ? grey[1] : 'transparent'};
  .names {
    flex: 1;
    overflow: hidden;
    svg {
      padding-right: 4px;
    }
  }
  .icons {
    svg {
      padding: 0 1px;
    }
  }
`

@inject('currentFileStore')
@inject('fileTreeStore')
@observer
export default class FileLine extends React.Component<FileLineProps> {
  handleClickFileLine = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentFileStore, file } = this.props
    const { pathname } = file
    const fileContent = await readFile(pathname)
    currentFileStore.setCurrentFile({
      pathname,
      content: fileContent
    })
  }

  handleClickTrashButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { file, fileTreeStore, currentFileStore } = this.props
    e.preventDefault()
    await unlink(file.pathname)
    const fileTree = await readFileNode('.')
    fileTreeStore.setFileTree(fileTree)
    const { currentFile } = currentFileStore
    if (currentFile != null && currentFile.pathname === file.pathname) {
      currentFileStore.setCurrentFile(null)
    }
  }

  render () {
    const { file, currentFileStore } = this.props
    const { currentFile } = currentFileStore
    const isSelected = currentFile != null && file.pathname === currentFile.pathname
      ? true
      : false

    return (
      <Container
        paddingLeft={fileNodePadding(file)}
        isSelected={isSelected}>
        <div
          className='names'
          onClick={this.handleClickFileLine}>
          <FontAwesomeIcon icon='file' />
          {path.basename(file.pathname)}
        </div>
        <div className='icons'>
          <Button onClick={this.handleClickTrashButton}>
            <FontAwesomeIcon icon='trash' />
          </Button>
        </div>
      </Container>
    )
  }
}
