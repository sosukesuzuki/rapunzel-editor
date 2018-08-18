import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FileNode } from '../../../lib/types'
import { observer, inject } from 'mobx-react'
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
import { ContextMenu, ContextMenuProvider, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { rename } from '../../../lib/filesystem/commands/rename'

interface DirectoryLineProps {
  directory: FileNode
  fileTreeStore?: FileTreeStore
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface DirectoryLineState {
  isInputOpen: boolean
  addInputContent: string
  inputType: 'file' | 'dir'
  isRenaming: boolean
  renameInputContent: string
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
      width: 15px;
      height: 15px;
    }
  }
  .icons {
    svg {
      padding: 0 1px;
    }
  }
`

const InputContainer = styled.div`
  padding: 0 2px;
  width: 100%;
  input {
    margin: 0 auto;
    padding: 2px;
    width: 100%;
  }
`

@inject('fileTreeStore')
@observer
export default class DirectoryLine extends React.Component<DirectoryLineProps, DirectoryLineState> {
  constructor (props) {
    super(props)
    this.state = {
      isInputOpen: false,
      addInputContent: '',
      inputType: 'file',
      isRenaming: false,
      renameInputContent: path.basename(props.directory.pathname)
    }
  }

  addDirInput: HTMLInputElement = null

  renameInput: HTMLInputElement = null

  setAddInputContent = (addInputContent: string) => this.setState({ addInputContent })

  setisInputOpen = (isInputOpen: boolean) => this.setState({ isInputOpen })

  setInputType = (inputType: 'file' | 'dir') => this.setState({ inputType })

  setIsRenaming = (isRenaming: boolean) => this.setState({ isRenaming })

  setRenameInputContent = (renameInputContent: string) => this.setState({ renameInputContent })

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

  handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { directory, fileTreeStore } = this.props
    const result = window.confirm(`Remove ${directory.pathname}.`)
    if (result) {
      await removeDirectory(directory.pathname)
      const fileTree = await readFileNode('.')
      fileTreeStore.setFileTree(fileTree)
    }
  }

  handleInputChange = (value: string) => {
    this.setAddInputContent(value)
  }

  handleAddKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { setIsOpen } = this.props
    const { inputType } = this.state
    const ENTER = 13
    if (e.keyCode === ENTER) {
      this.setisInputOpen(false)
      this.setAddInputContent('')
      setIsOpen(true)
      if (inputType === 'file') {
        await this.handleSubmitFile()
      } else if (inputType === 'dir') {
        await this.handleSubmitDir()
      }
    }
  }

  handleRenameKeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      this.setIsRenaming(false)
      await this.handleRename()
    }
  }

  handleRename = async () => {
    const { renameInputContent } = this.state
    const { directory, fileTreeStore } = this.props
    const newPathname = `${path.dirname(directory.pathname)}/${renameInputContent}`
    await rename(directory.pathname, newPathname)
    const fileTree = await readFileNode('.')
    fileTreeStore.setFileTree(fileTree)
  }

  handleSubmitFile = async () => {
    const { directory, fileTreeStore } = this.props
    const { addInputContent } = this.state
    if (!isMd(addInputContent)) {
      alert('File extension must be "md".')
      throw Error('File extension must be "md".')
    }
    await writeFile(`${directory.pathname}/${addInputContent}`, '')
    const fileTree = await readFileNode('.')
    fileTreeStore.setFileTree(fileTree)
  }

  handleSubmitDir = async () => {
    const { directory, fileTreeStore } = this.props
    const { addInputContent } = this.state
    await mkdir(`${directory.pathname}/${addInputContent}`)
    const fileTree = await readFileNode('.')
    fileTreeStore.setFileTree(fileTree)
  }

  handleClickRename = () => {
    this.setIsRenaming(true)
  }

  render () {
    const { onClick, directory, isOpen } = this.props
    const { isInputOpen, addInputContent, isRenaming, renameInputContent } = this.state
    const identifier = `${directory.pathname}_context_menu`
    return (
      <>
        <ContextMenuProvider id={identifier}>
          <Container paddingLeft={fileNodePadding(directory)}>
            { !isRenaming
                ? (
                  <>
                    <div className='folderName' onClick={onClick}>
                      <FontAwesomeIcon icon={isOpen ? 'caret-down' : 'caret-right'} />
                      {path.basename(directory.pathname)}
                    </div>
                    <div className='icons'>
                      <Button onClick={this.handleClickNewFileButton}>
                        <FontAwesomeIcon icon='file' />
                      </Button>
                      <Button onClick={this.handleClickNewFolderButton}>
                        <FontAwesomeIcon icon='folder' />
                      </Button>
                      <Button onClick={this.handleRemove}>
                        <FontAwesomeIcon icon='trash' />
                      </Button>
                    </div>
                  </>
                )
              : (
                <InputContainer>
                  <Input
                    innerRef={
                      (element: HTMLInputElement) => {
                        this.renameInput = element
                        if (this.renameInput != null) element.focus()
                      }
                    }
                    value={renameInputContent}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setRenameInputContent(e.target.value)}
                    onBlur={() => this.setIsRenaming(false)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleRenameKeydown(e)}
                  />
                </InputContainer>
              )
            }
          </Container>
        </ContextMenuProvider>
        <ContextMenu id={identifier}>
          <Item onClick={this.handleClickRename}>
            Rename
          </Item>
          <Item onClick={this.handleRemove}>
            Delete
          </Item>
        </ContextMenu>
        { isInputOpen &&
          <InputContainer>
            <Input
              innerRef={(element: HTMLInputElement) => {
                this.addDirInput = element
                if (this.addDirInput != null) element.focus()
              }}
              value={addInputContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleAddKeydown(e)}
              onBlur={() => this.setisInputOpen(false)} />
          </InputContainer>
          }
      </>
    )
  }
}
