import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import FileTreeLine from '../atoms/FileTreeLine'
import { grey } from '../../../lib/colors'
import { getFilesTree } from '../../../lib/filesystem/utils'
import Stores from '../../../lib/stores'
import { readFile } from '../../../lib/filesystem/queries'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import { SearchBox, ISearchBox } from 'office-ui-fabric-react/lib/SearchBox'
import key from 'keymaster'
import { File } from '../../../lib/types'

interface SearchModalProps {
  setCurrentFile?: (input: File) => Promise<void>
  closeModal: () => void
  isOpen: boolean
}

interface SearchModalState {
  filePaths: string[]
  searchQuery: string
}

const FileList = styled.div`
  margin-top: 20px;
  border-radius: 2px;
  border: 1px solid ${grey[3]}
  width: 700px;
  height: 545px;
  overflow-y: auto;
`

const StyledFileTreeLine = styled(FileTreeLine)`
  padding: 7px;
  color: ${grey[6]};
  border-bottom: 1px solid ${grey[3]};
`

const ModalInner = styled.div`
  padding: 30px;
`

@inject((s: Stores) => ({
  setCurrentFile: s.currentFileStore.setCurrentFile
}))
@observer
export default class SearchModal extends React.Component<SearchModalProps, SearchModalState> {
  constructor (props) {
    super(props)
    this.state = {
      filePaths: [],
      searchQuery: ''
    }

    key('escape', this.handlePushEsc)
  }

  timer: NodeJS.Timer
  input: ISearchBox

  async componentDidMount () {
    const filePaths = await getFilesTree('.')
    this.setFilePaths(filePaths)
  }

  setFilePaths = (filePaths: string[]) => this.setState({ filePaths })

  setSearchQuery = (searchQuery: string) => this.setState({ searchQuery })

  handlePushEsc = () => {
    this.props.closeModal()
  }

  handleChangeInput = async (e) => {
    clearTimeout(this.timer)
    this.setSearchQuery(e)

    this.timer = setTimeout(async () => {
      const { searchQuery } = this.state
      const filePaths = await getFilesTree('.')
      const newFilePaths = filePaths.filter(filePath => filePath.match(searchQuery))

      this.setFilePaths(newFilePaths)
    }, 100)
  }

  handleClickFileLine = async (filePath: string) => {
    const { setCurrentFile, closeModal } = this.props
    const fileContent = await readFile(filePath)
    setCurrentFile({
      pathname: filePath,
      content: fileContent
    })
    closeModal()
  }

  handleKeydownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      this.props.closeModal()
    }
  }

  render () {
    const { filePaths, searchQuery } = this.state
    const { closeModal, isOpen } = this.props

    return (
      <>
        <Modal
          isOpen={isOpen}
          isBlocking={false}
          onDismiss={closeModal}>
          <ModalInner>
            <SearchBox
              componentRef={(el: ISearchBox) => {
                el != null && (() => {
                  el.focus()
                  this.input = el
                })()
              }}
              placeholder='Please type the name of the file you are looking for.'
              value={searchQuery}
              onChange={this.handleChangeInput}
              onKeyDown={this.handleKeydownInput}
            />
            <FileList>
              {filePaths.map(filePath => (
                <StyledFileTreeLine
                  key={filePath}
                  onClick={() => this.handleClickFileLine(filePath)}>
                  {filePath}
                </StyledFileTreeLine>
              ))}
            </FileList>
          </ModalInner>
        </Modal>
      </>
    )
  }
}
