import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { FileNode, File } from '../../../lib/types'
import { observer, inject } from 'mobx-react'
import { mkdir, rename, writeFile } from '../../../lib/filesystem/commands'
import { readFileNode, removeDirectory } from '../../../lib/filesystem/utils'
import { fileNodePadding, isMd } from '../../../lib/utils'
import FileTreeLine from '../atoms/FileTreeLine'
import { ContextMenuProvider } from 'react-contexify'
import FileTreeLineContextMenu from './FileTreeLineContextMenu'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { IconButton } from 'office-ui-fabric-react/lib/Button'
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField'
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip'
import Stores from '../../../lib/stores'

interface DirectoryLineProps {
  directory: FileNode
  setFileTree?: (fileTree: FileNode) => void
  setCurrentFile?: (input: File) => Promise<void>
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
    font-size: 14px;
    i {
      font-size: 3px;
      margin-right: 7px;
    }
  }
  .icons {
    button {
      height: 25px;
      div {
        height: 25px;
        line-height: 25px;
        i {
          font-size: 14px;
        }
      }
    }
  }
`

const InputContainer = styled.div`
  padding: 0 10px;
  margin-left: ${(props: ContainerProps) => props.paddingLeft}px;
`

const RenameInputContainer = styled(InputContainer)`
  height: 25px;
  div {
    height: 25px;
  }
`

const AddFileNodeContainer = styled(InputContainer)`
  width: 100%;
  height: 25px;
  div {
    width: 100%;
    height: 25px;
  }
`

@inject((s: Stores) => ({
  setCurrentFile: s.currentFileStore.setCurrentFile,
  setFileTree: s.fileTreeStore.setFileTree
}))
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

  addDirInput: ITextField = null

  renameInput: ITextField = null

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

  handleRemove = async () => {
    const { directory, setFileTree } = this.props
    const result = window.confirm(`Remove ${directory.pathname}.`)
    if (result) {
      await removeDirectory(directory.pathname)
      const fileTree = await readFileNode('.')
      setFileTree(fileTree)
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
      await this.rename()
    }
  }

  rename = async () => {
    const { renameInputContent } = this.state
    const { directory, setFileTree } = this.props
    const newPathname = `${path.dirname(directory.pathname)}/${renameInputContent}`
    await rename(directory.pathname, newPathname)
    const fileTree = await readFileNode('.')
    setFileTree(fileTree)
  }

  handleSubmitFile = async () => {
    const { directory, setFileTree, setCurrentFile } = this.props
    const { addInputContent } = this.state
    if (!isMd(addInputContent)) {
      alert('File extension must be "md".')
      throw Error('File extension must be "md".')
    }
    const filePath = `${directory.pathname}/${addInputContent}`
    await writeFile(filePath, '')
    const fileTree = await readFileNode('.')
    setFileTree(fileTree)
    setCurrentFile({
      pathname: filePath,
      content: ''
    })
  }

  handleSubmitDir = async () => {
    const { directory, setFileTree } = this.props
    const { addInputContent } = this.state
    await mkdir(`${directory.pathname}/${addInputContent}`)
    const fileTree = await readFileNode('.')
    setFileTree(fileTree)
  }

  handleClickRename = () => {
    this.setIsRenaming(true)
  }

  render () {
    const { onClick, directory, isOpen } = this.props
    const { isInputOpen, addInputContent, isRenaming, renameInputContent } = this.state
    const contextIdentifier = `${directory.pathname}_context_menu`
    const directoryDeleteIdentifier = `${directory.pathname}_delete_tooltip`
    const newDirectoryIdentifier = `${directory.pathname}_new_dir_tooltip`
    const newFileIdentifier = `${directory.pathname}_new_file_tooltip`

    return (
      <>
        <ContextMenuProvider id={contextIdentifier}>
          <Container paddingLeft={fileNodePadding(directory)}>
            { !isRenaming
                ? (
                  <>
                    <div className='folderName' onClick={onClick}>
                      <Icon
                        iconName={isOpen ? 'CaretBottomRightCenter8' : 'CaretRightSolid8'}
                      />
                      {path.basename(directory.pathname)}
                    </div>
                    <div className='icons'>
                      <TooltipHost content='new file' id={newFileIdentifier}>
                        <IconButton
                          aria-describedby={newFileIdentifier}
                          iconProps={{ iconName: 'AddNotes' }}
                          ariaLabel='File'
                          title='File'
                          onClick={this.handleClickNewFileButton}
                        />
                      </TooltipHost>
                      <TooltipHost content='new directory' id={newDirectoryIdentifier}>
                        <IconButton
                          iconProps={{ iconName: 'FabricNewFolder' }}
                          ariaLabel='Folder'
                          title='Folder'
                          onClick={this.handleClickNewFolderButton}
                          aria-describedby={newDirectoryIdentifier}
                        />
                      </TooltipHost>
                      {directory.pathname !== '.' &&
                        <TooltipHost content='delete' id={directoryDeleteIdentifier}>
                          <IconButton
                            iconProps={{ iconName: 'Delete' }}
                            ariaLabel='Trash'
                            title='Trash'
                            onClick={this.handleRemove}
                            aria-describedby={directoryDeleteIdentifier}
                          />
                        </TooltipHost>
                      }
                    </div>
                  </>
                )
              : (
                <AddFileNodeContainer paddingLeft={0}>
                  <TextField
                    className='addFilenodeInput'
                    componentRef={
                      (element) => {
                        this.renameInput = element
                        this.renameInput != null && element.focus()
                      }
                    }
                    value={renameInputContent}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setRenameInputContent(e.target.value)}
                    onBlur={() => {
                      this.setRenameInputContent(path.basename(directory.pathname))
                      this.setIsRenaming(false)
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleRenameKeydown(e)}
                  />
                </AddFileNodeContainer>
              )
            }
          </Container>
        </ContextMenuProvider>
        <FileTreeLineContextMenu
          identifier={contextIdentifier}
          onRenameClick={this.handleClickRename}
          onDeleteClick={this.handleRemove} />
        { isInputOpen &&
          <RenameInputContainer paddingLeft={fileNodePadding(directory)}>
            <TextField
              componentRef={(element) => {
                this.addDirInput = element
                if (this.addDirInput != null) {
                  element.focus()
                }
              }}
              value={addInputContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleInputChange(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => this.handleAddKeydown(e)}
              onBlur={() => {
                this.setisInputOpen(false)
              }}
            />
          </RenameInputContainer>
        }
      </>
    )
  }
}
