import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FileNode } from '../../../lib/types'
import { observer, inject } from 'mobx-react';
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import { writeFile } from '../../../lib/filesystem/commands/writeFile'
import { mkdir } from '../../../lib/filesystem/commands/mkdir'
import { readFileNode } from '../../../lib/utils/getFileTree'
import { isMd } from '../../../lib/utils/isMd'
import { fileNodePadding } from '../../../lib/fileNodePadding'
import { removeDirectory } from '../../../lib/utils/removeDirectory'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import FileTreeLine from '../atoms/FileTreeLine'

interface DirectoryLineProps {
  directory: FileNode
  fileTreeStore?: FileTreeStore
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  isOpen: boolean
  setIsOpen: (boolean) => void
}

interface DirectoryLineState {
  isInputOpen: boolean
  inputContent: string
  inputType: 'file' | 'dir'
}

interface ContainerProps {
  paddingLeft: number
}

const Container = styled(FileTreeLine)`
  padding-left: ${(props: ContainerProps) => props.paddingLeft}px;
  .folderName {
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

const StyledInput = styled(Input)`
  margin: 0 auto;
  width: 98%;
`

@inject('fileTreeStore')
@observer
export default class DirectoryLine extends React.Component<DirectoryLineProps, DirectoryLineState> {
  constructor (props) {
    super(props)
    this.state = {
      isInputOpen: false,
      inputContent: '',
      inputType: 'file'
    }
  }

  input = null

  setInputContent = (inputContent: string) => this.setState({inputContent})

  setisInputOpen = (isInputOpen: boolean) => this.setState({isInputOpen})

  setInputType = (inputType: 'file' | 'dir') => this.setState({inputType})

  handleClickNewFileButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.setisInputOpen(true)
    this.setInputType('file')
  }

  handleClickNewFolderButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.setisInputOpen(true)
    this.setInputType('dir')
  }

  handleClickTrashButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { directory, fileTreeStore } = this.props
    const result = window.confirm(`Remove ${directory.pathname}.`)
    if (result) {
      await removeDirectory(directory.pathname)
      const fileTree = await readFileNode('.')
      fileTreeStore.setFileTree(fileTree)
    }
  }

  handleInputChange = (value: string) => {
    this.setInputContent(value)
  }

  handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { setIsOpen } = this.props
    const { inputType } = this.state
    const ENTER = 13
    if (e.keyCode === ENTER) {
      this.setisInputOpen(false)
      this.setInputContent('')
      setIsOpen(true)
      if (inputType === 'file') {
        this.handleSubmitFile()
      } else if (inputType === 'dir') {
        this.handleSubmitDir()
      }
    }
  }

  handleSubmitFile = async () => {
    const { directory, fileTreeStore } = this.props
    const { inputContent } = this.state
    if (!isMd(inputContent)) {
      alert('File extension must be "md".')
      throw Error('File extension must be "md".')
    }
    await writeFile(`${directory.pathname}/${inputContent}`, '')
    const fileTree = await readFileNode('.')
    fileTreeStore.setFileTree(fileTree)
  }

  handleSubmitDir = async () => {
    const { directory, fileTreeStore } = this.props  
    const { inputContent } = this.state 
    await mkdir(`${directory.pathname}/${inputContent}`)
    const fileTree = await readFileNode('.')
    fileTreeStore.setFileTree(fileTree)
  }

  render () {
    const { onClick, directory, isOpen } = this.props
    const { isInputOpen, inputContent } = this.state
    return (
      <>
        <Container paddingLeft={fileNodePadding(directory)}>
          <div className='folderName' onClick={onClick}>
            <FontAwesomeIcon icon={isOpen ? 'folder-open' : 'folder'} />
            {directory.pathname}
          </div>
          <div className='icons'>
            <Button onClick={this.handleClickNewFileButton}> 
              <FontAwesomeIcon icon='file' />
            </Button>
            <Button onClick={this.handleClickNewFolderButton}>
              <FontAwesomeIcon icon='folder' />
            </Button>
            <Button onClick={this.handleClickTrashButton}>
              <FontAwesomeIcon icon='trash' />
            </Button>
          </div>
        </Container>
        { isInputOpen &&
          <StyledInput
            innerRef={(element: HTMLInputElement) => {
              this.input = element
              if (this.input != null) element.focus()
            }}
            value={inputContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleKeydown(e)}
            onBlur={() => this.setisInputOpen(false)} />
          }
      </>
    )
  }
}
