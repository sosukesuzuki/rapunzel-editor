import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import AddFileButton from '../atoms/AddFileButton'
import { isMd } from '../../../lib/utils/isMd'
import { writeFile } from '../../../lib/filesystem/commands/writeFile'
import { readDirectories } from '../../../lib/utils/readDirectories'
import { DirectoriesStore } from '../../../lib/stores/DirectoriesStore'
import { Directories } from '../../../lib/types'

const Container = styled.div`
  .flexContainer {
    height: 30px;
    display: flex;
    span {
      padding: 0 7px;
      line-height: 30px;
      flex: 1;
      font-weight: bold;
    }
  }
  input {
    width: 100%;
  }
`

interface FileTreeControlProps {
  directoriesStore?: DirectoriesStore
}

interface FileTreeControlState {
  isInputting: boolean
  inputContent: string
}

@inject('directoriesStore')
@observer
export default class FileTreeControl extends React.Component<FileTreeControlProps, FileTreeControlState> {
  constructor (props) {
    super(props)
    this.state = {
      isInputting: false,
      inputContent: ''
    }
  }
  
  input: HTMLInputElement = null

  setIsInputting = (isInputting: boolean) => this.setState({ isInputting })

  setInputContent = (inputContent: string) => this.setState({ inputContent })

  handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    this.submitInput()
  }

  submitInput = async () => {
    const { inputContent } = this.state
    if (isMd(inputContent)) {
      this.setInputContent('')
      this.setIsInputting(false)
      await writeFile(`./${inputContent}`, '')
      const directories: Directories = await readDirectories('.')
      this.props.directoriesStore.setDirectories(directories)
    } else {
      throw Error('The file extension must be ".md".')
    }
  }

  render () {
    const {
      isInputting,
      inputContent
    } = this.state
    return (
      <Container>
        <div className='flexContainer'>
          <span>File Tree</span>
          <div>
            <AddFileButton onClick={() => this.setIsInputting(true)} />
          </div>
        </div>
        { isInputting &&
          <input
            ref={input => {
              this.input = input
              if (input != null) this.input.focus()
            }}
            value={inputContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setInputContent(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => this.handleKeydown(e)}
            onBlur={() => this.setIsInputting(false)}
          />
        }
      </Container>
    )
  }
}
