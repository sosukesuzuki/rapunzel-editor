import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FileNode } from '../../../lib/types'
import { observer, inject } from 'mobx-react';
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import { writeFile } from '../../../lib/filesystem/commands/writeFile'
import { mkdir } from '../../../lib/filesystem/commands/mkdir'
import { readFileNode } from '../../../lib/utils/getFileTree'
import { isMd } from '../../../lib/utils/isMd'

interface DirectoryLineProps {
  directory: FileNode
  fileTreeStore?: FileTreeStore
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

interface DirectoryLineState {
  isOpen: boolean
  inputContent: string
  inputType: 'file' | 'dir'
}

interface ContainerProps {
  paddingLeft: number
}

const Container = styled.div`
  padding-left: ${(props: ContainerProps) => props.paddingLeft}px;
  display: flex;
  &:hover {
    background-color: ${grey[2]}
  }
  .folderName {
    flex: 1;
  }
  .icons {
    svg {
      padding: 0 1p;
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

const StyledInput = styled.input`
  width: 100%;
`

@inject('fileTreeStore')
@observer
export default class DirectoryLine extends React.Component<DirectoryLineProps, DirectoryLineState> {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      inputContent: '',
      inputType: 'file'
    }
  }

  input = null

  setInputContent = (inputContent: string) => this.setState({inputContent})

  setIsOpen = (isOpen: boolean) => this.setState({isOpen})

  setInputType = (inputType: 'file' | 'dir') => this.setState({inputType})

  handleClickNewFileButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.setIsOpen(true)
    this.setInputType('file')
  }

  handleClickNewFolderButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.setIsOpen(true)
    this.setInputType('dir')
  }

  handleInputChange = (value: string) => {
    this.setInputContent(value)
  }

  handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { inputType } = this.state
    if (e.key === 'Enter') {
      this.setIsOpen(false)
      this.setInputContent('')
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
      throw Error('File extension must be "md".')
    }
    await writeFile(`${directory.pathname}/${inputContent}`, '')
    const fileTree = await readFileNode('.')
    fileTreeStore.setDirectories(fileTree)
  }

  handleSubmitDir = async () => {
    const { directory, fileTreeStore } = this.props  
    const { inputContent } = this.state 
    await mkdir(`${directory.pathname}/${inputContent}`)
    const fileTree = await readFileNode('.')
    fileTreeStore.setDirectories(fileTree)
  }

  render () {
    const { onClick, directory } = this.props
    const { isOpen, inputContent } = this.state
    const paddingLeft = (directory.pathname.split('/').length - 1) * 5
    return (
      <>
        <Container paddingLeft={paddingLeft}>
          <div className='folderName' onClick={onClick}>
            {directory.pathname}
          </div>
          <div className='icons'>
            <button onClick={this.handleClickNewFileButton}> 
              <FontAwesomeIcon icon='file' />
            </button>
            <button onClick={this.handleClickNewFolderButton}>
              <FontAwesomeIcon icon='folder' />
            </button>
          </div>
        </Container>
        { isOpen &&
          <StyledInput
            innerRef={(element: HTMLInputElement) => {
              this.input = element
              if (this.input != null) element.focus()
            }}
            value={inputContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleKeydown(e)}
            onBlur={() => this.setIsOpen(false)} />
          }
      </>
    )
  }
}
