import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import Input from '../atoms/Input'
import FileTreeLine from '../atoms/FileTreeLine'
import { grey } from '../../../lib/colors'
import { getFilesTree } from '../../../lib/utils/getFileTree'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import { readFile } from '../../../lib/filesystem/queries/readFile'

interface SearchModalProps {
  currentFileStore?: CurrentFileStore
  closeModal: () => void
}

interface SearchModalState {
  filePaths: string[]
  searchQuery: string
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-inde: 0;
`

const Modal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 600px;
  width: 700px;
  margin: auto;
  background-color: white;
  border: 1px solid ${grey[3]};
  border-radius: 5px;
  padding: 20px;
  z-index: 1;
  box-shadow: 0 0 15px rgba(0,0,0,.3);
  input {
    border: 1px solid ${grey[3]};
    padding: 5px;
    width: 690px;
  }
  .fileList {
    margin-top: 20px;
    border-radius: 2px;
    border: 1px solid ${grey[3]}
    width: 700px;
    height: 545px;
    overflow-y: auto;
  }
`

const StyledFileTreeLine = styled(FileTreeLine)`
  padding: 7px;
  color: ${grey[6]};
  border-bottom: 1px solid ${grey[3]};
`

@inject('currentFileStore')
@observer
export default class SearchModal extends React.Component<SearchModalProps, SearchModalState> {
  constructor (props) {
    super(props)
    this.state = {
      filePaths: [],
      searchQuery: ''
    }
  }

  timer: NodeJS.Timer

  async componentDidMount () {
    const filePaths = await getFilesTree('.')
    this.setFilePaths(filePaths)
  }

  setFilePaths = (filePaths: string[]) => this.setState({ filePaths })

  setSearchQuery = (searchQuery: string) => this.setState({ searchQuery })

  handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    clearTimeout(this.timer)
    this.setSearchQuery(e.target.value)

    this.timer = setTimeout(async () => {
      const { searchQuery } = this.state
      const filePaths = await getFilesTree('.')
      const newFilePaths = filePaths.filter(filePath => filePath.match(searchQuery))

      this.setFilePaths(newFilePaths)
    }, 100)
  }

  handleClickFileLine = async (filePath: string) => {
    const { currentFileStore } = this.props
    const fileContent = await readFile(filePath)
    currentFileStore.setCurrentFile({
      pathname: filePath,
      content: fileContent
    })
  }

  render () {
    const { filePaths, searchQuery } = this.state
    const { closeModal } = this.props
    return (
      <>
        <Container onClick={closeModal} />
        <Modal>
          <Input
            innerRef={el => el != null && el.focus()}
            placeholder='Please type the name of the file you are looking for.'
            value={searchQuery}
            onChange={this.handleChangeInput}
          />
          <div className='fileList'>
            {filePaths.map(filePath => (
              <StyledFileTreeLine
                key={filePath}
                onClick={() => this.handleClickFileLine(filePath)}>
                {filePath}
              </StyledFileTreeLine>
            ))}
          </div>
        </Modal>
      </>
    )
  }
}
