import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { FileNode } from '../../../lib/types'
import { observer, inject } from 'mobx-react'
import { grey } from '../../../lib/colors'
import { fileNodePadding } from '../../../lib/fileNodePadding'
import { unlink } from '../../../lib/filesystem/commands/unlink'
import { readFileNode } from '../../../lib/filesystem/utils'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import { readFile } from '../../../lib/filesystem/queries/readFile'
import { ContextMenuProvider } from 'react-contexify'
import { rename } from '../../../lib/filesystem/commands/rename'
import FileTreeLineContextMenu from './FileTreeLineContextMenu'
import FileTreeLine from '../atoms/FileTreeLine'
import { IconButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField'
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip'

interface FileLineProps {
  file: FileNode
  fileTreeStore?: FileTreeStore
  currentFileStore?: CurrentFileStore
}

interface FileLineState {
  isRenaming: boolean
  renameInputContent: string
}

interface ContainerProps {
  paddingLeft: number
  isSelected: boolean
}

const InputContainer = styled.div`
  width: 100%;
  height: 25px;
  div {
    height: 25px;
    width: 100%;
  }
`

const Container = styled(FileTreeLine)`
  padding-left: ${(props: ContainerProps) => props.paddingLeft}px;
  background-color: ${({ isSelected }: ContainerProps) => isSelected ? grey[0] : 'transparent'};
  color: ${({ isSelected }: ContainerProps) => isSelected ? 'black' : grey[6]};
  .names {
    flex: 1;
    overflow: hidden;
    font-size: 14px;
    i {
      padding-right: 7px;
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

@inject('currentFileStore')
@inject('fileTreeStore')
@observer
export default class FileLine extends React.Component<FileLineProps, FileLineState> {
  constructor (props: FileLineProps) {
    super(props)

    this.state = {
      isRenaming: false,
      renameInputContent: path.basename(props.file.pathname)
    }
  }

  renameInput: ITextField

  setIsRenaming = (isRenaming: boolean) => this.setState({ isRenaming })

  setRenameInputContent = (renameInputContent: string) => this.setState({ renameInputContent })

  handleClickFileLine = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentFileStore, file } = this.props
    const { pathname } = file
    const fileContent = await readFile(pathname)
    currentFileStore.setCurrentFile({
      pathname,
      content: fileContent
    })
  }

  handleClickTrashButton = async () => {
    const { file, fileTreeStore, currentFileStore } = this.props
    const result = window.confirm(`Remove ${file.pathname}.`)
    if (result) {
      await unlink(file.pathname)
      const fileTree = await readFileNode('.')
      fileTreeStore.setFileTree(fileTree)
      const { currentFile } = currentFileStore
      if (currentFile != null && currentFile.pathname === file.pathname) {
        currentFileStore.setCurrentFile(null)
      }
    }
  }

  handleRenameClick = () => {
    this.setIsRenaming(true)
  }

  handleRenameKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      this.setIsRenaming(false)
      await this.rename()
    }
  }

  rename = async () => {
    const { renameInputContent } = this.state
    const { file, fileTreeStore } = this.props
    const newPathname = `${path.dirname(file.pathname)}/${renameInputContent}`
    await rename(file.pathname, newPathname)
    const fileTree = await readFileNode('.')
    fileTreeStore.setFileTree(fileTree)
  }

  render () {
    const { file, currentFileStore } = this.props
    const { isRenaming, renameInputContent } = this.state
    const { currentFile } = currentFileStore
    const isSelected = currentFile != null && file.pathname === currentFile.pathname
    const contextIdentifier = `${file.pathname}_context_menu`
    const fileDeleteIdentifier = `${file.pathname}_delete_tooltop`

    return (
      <>
        <ContextMenuProvider id={contextIdentifier}>
          <Container
            paddingLeft={fileNodePadding(file)}
            isSelected={isSelected}>
            { !isRenaming
              ? (
                <>
                  <div
                    className='names'
                    onClick={this.handleClickFileLine}>
                    <Icon iconName='QuickNote' />
                    {path.basename(file.pathname)}
                  </div>
                  <div className='icons'>
                    <TooltipHost content='Delete' id={fileDeleteIdentifier}>
                      <IconButton
                        iconProps={{ iconName: 'Delete' }}
                        ariaLabel='Trash'
                        title='Trash'
                        onClick={this.handleClickTrashButton}
                        aria-describedby={fileDeleteIdentifier}
                      />
                    </TooltipHost>
                  </div>
                </>
              )
              : (
                <InputContainer>
                  <TextField
                    className='addFileNodeInput'
                    componentRef={
                      (e) => {
                        this.renameInput = e
                        this.renameInput && e.focus()
                      }
                    }
                    value={renameInputContent}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setRenameInputContent(e.target.value)}
                    onKeyDown={this.handleRenameKeyDown}
                    onBlur={() => {
                      this.setRenameInputContent(path.basename(file.pathname))
                      this.setIsRenaming(false)
                    }}
                  />
                </InputContainer>
              )
            }
          </Container>
        </ContextMenuProvider>
        <FileTreeLineContextMenu
          identifier={contextIdentifier}
          onRenameClick={this.handleRenameClick}
          onDeleteClick={this.handleClickTrashButton} />
      </>
    )
  }
}
