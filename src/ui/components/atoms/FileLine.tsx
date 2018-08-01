import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { FileNode } from '../../../lib/types'
import { observer, inject } from 'mobx-react'
import { grey } from '../../../lib/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fileNodePadding } from '../../../lib/fileNodePadding'
import { unlink } from '../../../lib/filesystem/commands/unlink'
import { readFileNode } from '../../../lib/utils/getFileTree';
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore';
import { readFile } from '../../../lib/filesystem/queries/readFile'

interface FileLineProps {
  file: FileNode
  fileTreeStore?: FileTreeStore
  currentFileStore?: CurrentFileStore
}

interface ContainerProps {
  paddingLeft: number
}

const Container = styled.div`
  display: flex;
  padding-left: ${(props: ContainerProps) => props.paddingLeft}px;
  background-color: transparent;
  .names {
    flex: 1;
    svg {
      padding-right: 4px;
    }
  }
  &:hover {
    background-color: ${grey[2]};
  }
  .icons {
    svg {
      padding: 0 1px;
      &:hover {
        color: ${grey[5]}
      }
    }
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
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
    const { file, fileTreeStore } = this.props
    e.preventDefault()
    await unlink(file.pathname)
    const fileTree = await readFileNode('.')
    fileTreeStore.setFileTree(fileTree)
  }

  render () {
    const { file } = this.props
    return (
      <Container paddingLeft={fileNodePadding(file)}>
        <div
          className='names'
          onClick={this.handleClickFileLine}>
          <FontAwesomeIcon icon='file' />
          {path.basename(file.pathname)}
        </div>
        <div className='icons'>
          <button onClick={this.handleClickTrashButton}>
            <FontAwesomeIcon icon='trash' />
          </button>
        </div>
      </Container>
    )
  }
}