import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FileNode } from '../../../lib/types'
import { observer, inject } from 'mobx-react';
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'

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

const Container = styled.div`
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
    if (e.key === 'Enter') {
      this.setIsOpen(false)
      this.setInputContent('')
    }
  }

  render () {
    const { onClick, directory } = this.props
    const { isOpen, inputContent } = this.state
    return (
      <>
        <Container>
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
